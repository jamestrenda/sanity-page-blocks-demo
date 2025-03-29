import {ReactNode} from 'react'
import {Observable} from 'rxjs'
import {DocumentStore, PortableTextBlock, PortableTextTextBlock} from 'sanity'
import {home} from '../schemaTypes/singletons/settings/home'
import {PreviewValue} from 'sanity'

export function getPortableTextPreview(
  value: PortableTextBlock[],
  title: string,
): {
  title: string
  subtitle?: string
} {
  if (!value) {
    return {
      title,
    }
  }

  // find the first default block style that is a heading or paragraph
  let text = value.find(
    (block) =>
      block._type === 'block' && ['h1', 'h2', 'h3', 'normal'].includes(block.style as string),
  ) as PortableTextTextBlock

  // if no appropriate heading is detected, use the first block—whatever it may be
  if (!text) {
    text = value[0] as PortableTextTextBlock
  }

  // concat the block of text because it could be broken up into multiple children depending on its marks
  const textSnippet = text?.children.map((child) => child.text).join('')
  const hasTextSnippet = textSnippet.length > 0

  return {
    title: hasTextSnippet ? textSnippet : title,
    subtitle: hasTextSnippet ? title : undefined,
  }
}

/**
 * Fetches the homepage ID by resolving the observable.
 */
export function getHomepageObservable(documentStore: DocumentStore): Observable<string | null> {
  return listenToQuery<string | null>(documentStore, `*[_id == "${home.name}"][0].homepage._ref`)
}

/**
 * Returns an observable for a given Sanity query.
 */
export function listenToQuery<T>(
  documentStore: DocumentStore,
  query: string,
  params: Record<string, any> = {},
): Observable<T> {
  return documentStore.listenQuery(query, params, {}) as Observable<T>
}

export const getPreivewOutput = ({
  title,
  subtitle,
  media,
}: {
  title: string
  subtitle?: string
  media?: ReactNode
}): PreviewValue => {
  return {
    title,
    subtitle,
    media,
  }
}
