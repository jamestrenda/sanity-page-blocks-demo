"use client";
import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute, type SanityDocument } from "next-sanity";
import type { ComponentType } from "react";

import { Hero } from "./hero";
import { dataset, projectId, studioUrl } from "../../lib/sanity/api";
import { INDEX_QUERYResult } from "@repo/sanity/sanity.types";
import { BlocksType } from "../../types";

type Block = NonNullable<NonNullable<INDEX_QUERYResult>["blocks"]>[number];

export type Props = {
  blocks: Block[];
  _id: string;
  _type: string;
};

type PageData = {
  _id: string;
  _type: string;
  blocks?: Block[];
};

const BLOCK_COMPONENTS = {
  heroBlock: Hero,
  textBlock: () => <div>Text Block</div>,
} as const;

type BlockType = keyof typeof BLOCK_COMPONENTS;

export function Blocks({ blocks: initial = [], _id, _type }: Props) {
  const blocks = useOptimistic<Block[], SanityDocument<PageData>>(
    initial,
    (currentBlocks, action) => {
      if (action.id === _id && action.document.blocks) {
        return action.document.blocks;
      }

      return currentBlocks;
    }
  );

  return (
    <div
      className="blocks"
      data-sanity={createDataAttribute({
        id: _id,
        baseUrl: studioUrl,
        projectId: projectId,
        dataset: dataset,
        type: _type,
        path: "blocks",
      }).toString()}
    >
      {blocks.map((block) => {
        const Component = BLOCK_COMPONENTS[block._type] as ComponentType<
          BlocksType<BlockType>
        >;

        if (!Component) {
          return (
            <div
              key={`${block._type}-${block._key}`}
              className="flex items-center justify-center p-8 text-center text-muted-foreground bg-muted rounded-lg"
            >
              Component not found for block type: <code>{block._type}</code>
            </div>
          );
        }

        return (
          <div
            key={`${block._type}-${block._key}`}
            data-sanity={createDataAttribute({
              id: _id,
              baseUrl: studioUrl,
              projectId: projectId,
              dataset: dataset,
              type: _type,
              path: `blocks[_key=="${block._key}"]`,
            }).toString()}
          >
            <Component {...block} />
          </div>
        );
      })}
    </div>
  );
}
