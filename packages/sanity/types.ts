import {z} from 'zod'
import type {INDEX_QUERYResult} from './sanity.types'

export type BlocksTypes = NonNullable<NonNullable<INDEX_QUERYResult>['blocks']>[number]['_type']

export type BlocksType<T extends BlocksTypes> = Extract<
  NonNullable<NonNullable<INDEX_QUERYResult>['blocks']>[number],
  {_type: T}
>

export type ActionsType = NonNullable<NonNullable<BlocksType<'heroBlock'>>['actions']>[number]

// export type ActionsType = z.infer<
//   (typeof NonNullable<NonNullable<BlocksType<'heroBlock'>>['actions']>)[number]
// >

export type ActionProps = NonNullable<NonNullable<BlocksType<'heroBlock'>>['actions']>[number]

export type SanityImageProps = NonNullable<NonNullable<BlocksType<'heroBlock'>>['image']>

export type SanityPortableTextProps = NonNullable<NonNullable<BlocksType<'heroBlock'>>['text']>

export type SanityPortableTextBlock = Extract<
  NonNullable<NonNullable<SanityPortableTextProps>[number]>,
  {_type: 'block'}
>

export type Maybe<T> = T | null | undefined
