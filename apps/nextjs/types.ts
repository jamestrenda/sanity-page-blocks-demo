import type { INDEX_QUERYResult } from "@repo/sanity/sanity.types";

export type BlocksTypes = NonNullable<
  NonNullable<INDEX_QUERYResult>["blocks"]
>[number]["_type"];

export type BlocksType<T extends BlocksTypes> = Extract<
  NonNullable<NonNullable<INDEX_QUERYResult>["blocks"]>[number],
  { _type: T }
>;

export type SanityImageProps = NonNullable<
  NonNullable<BlocksType<"heroBlock">>["image"]
>;

export type SanityPortableTextProps = NonNullable<
  NonNullable<BlocksType<"heroBlock">>["text"]
>;

export type SanityPortableTextBlock = Extract<
  NonNullable<NonNullable<SanityPortableTextProps>[number]>,
  { _type: "block" }
>;

export type Maybe<T> = T | null | undefined;
