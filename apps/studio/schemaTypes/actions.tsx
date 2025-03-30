import {defineField, defineType, PreviewValue} from 'sanity'
import {ArrowRightIcon} from 'lucide-react'

import {preview as externalLinkPreview} from './externalLink'
import {preview as internalLinkPreview} from './internalLink'
import {preview as mediaLinkPreview} from './mediaLink'

export default defineType({
  name: 'actions',
  title: 'Actions',
  type: 'object',
  preview: {
    select: {
      title: 'action.text',
      to: 'action.to[0]',
      internalTitle: 'action.to.0.link.document.title',
      internalSlug: 'action.to.0.link.document.slug.current',
      internalAnchor: 'action.to[0].anchor',
      internalParams: 'action.to[0].params',
      mediaFilename: 'action.to.0.link.file.asset.originalFilename',
    },
    prepare(selection) {
      const {title, to} = selection

      const type = to?._type

      switch (type) {
        case 'internal': {
          const {internalTitle, internalSlug, internalAnchor, internalParams} = selection
          let subtitle = ''
          if (internalSlug) {
            subtitle += `/${internalSlug}`
          }
          if (internalParams) {
            subtitle += `?${internalParams
              .map(({key, value}: {key: string; value: string}) => `${key}=${value}`)
              .join('&')}`
          }
          if (internalAnchor) {
            subtitle += `#${internalAnchor}`
          }

          return internalLinkPreview({
            title: title || internalTitle || 'Untitled',
            path: subtitle,
            outputOnly: true,
          }) as PreviewValue
        }
        case 'external':
          return externalLinkPreview({
            title,
            path: to.link.url,
            outputOnly: true,
          }) as PreviewValue
        case 'relative': {
          return {
            title,
            subtitle: to.url,
            media: <ArrowRightIcon size="1em" />,
          }
        }
        case 'media': {
          const {mediaFilename: path} = selection
          return mediaLinkPreview({title, path, outputOnly: true}) as PreviewValue
        }
        default:
          return {
            title,
          }
      }
    },
  },
  fields: [
    defineField({
      name: 'actions',
      type: 'array',
      of: [
        {
          type: 'action',
        },
      ],
      // validation: (Rule) => Rule.required().max(1),
    }),
  ],
})
