'use client';
import { useOptimistic } from '@sanity/visual-editing/react';
import { createDataAttribute, type SanityDocument } from 'next-sanity';
import type { ComponentType } from 'react';

import { INDEX_QUERYResult } from '@repo/sanity/sanity.types';
import { BlocksType } from '@repo/sanity/types';
import { dataset, projectId, studioUrl } from '../../lib/sanity/api';
import { CarouselBlock } from './carousel';
import { ContainerBlock } from './containerBlock';
import { FaqBlock } from './faqBlock';
import { FullBleedContainerBlock } from './fullBleedContainerBlock';
import { Hero } from './hero';
import { TextBlock } from './text-block';

type Block = NonNullable<NonNullable<INDEX_QUERYResult>['blocks']>[number];

export type Props = {
  blocks: Block[];
  _id?: string;
  _type?: string;
};

type PageData = {
  _id: string;
  _type: string;
  blocks?: Block[];
};

const BLOCK_COMPONENTS = {
  carouselBlock: CarouselBlock,
  containerBlock: ContainerBlock,
  fullBleedContainerBlock: FullBleedContainerBlock,
  faqBlock: FaqBlock,
  heroBlock: Hero,
  textBlock: TextBlock,
} as const;

type BlockType = keyof typeof BLOCK_COMPONENTS;

export function Blocks({ blocks: initial = [], _id, _type }: Props) {
  const blocks = useOptimistic<Block[], SanityDocument<PageData>>(
    initial,
    (currentBlocks, action) => {
      if (_id) {
        if (action.id === _id && action.document.blocks) {
          return action.document.blocks;
        }
      }

      return currentBlocks;
    },
  );

  return (
    <div
      className="blocks space-y-8 md:space-y-14"
      data-sanity={
        _id && _type
          ? createDataAttribute({
              id: _id,
              baseUrl: studioUrl,
              projectId: projectId,
              dataset: dataset,
              type: _type,
              path: 'blocks',
            }).toString()
          : undefined
      }
    >
      {blocks.map((block) => {
        const Component = BLOCK_COMPONENTS[block._type] as ComponentType<
          BlocksType<BlockType>
        >;

        if (!Component) {
          return (
            <div
              key={`${block._type}-${block._key}`}
              className="flex items-center justify-center rounded-lg bg-muted p-8 text-center text-muted-foreground"
            >
              Component not found for block type: <code>{block._type}</code>
            </div>
          );
        }

        return (
          <div
            className="peer group"
            key={`${block._type}-${block._key}`}
            data-sanity={
              _id && _type
                ? createDataAttribute({
                    id: _id,
                    baseUrl: studioUrl,
                    projectId: projectId,
                    dataset: dataset,
                    type: _type,
                    path: `blocks[_key=="${block._key}"]`,
                  }).toString()
                : undefined
            }
          >
            <Component {...block} />
          </div>
        );
      })}
    </div>
  );
}
