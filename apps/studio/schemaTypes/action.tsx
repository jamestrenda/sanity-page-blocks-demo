import {ArrowRightIcon, Link2Icon} from 'lucide-react'
import {defineField, defineType, PreviewConfig, PreviewValue, QueryParams} from 'sanity'

import {anchorField} from './anchor'
import {externalLinkField} from './externalLinkField'
import {internalLinkField} from './internalLinkField'
import {mediaLinkField} from './mediaLinkField'
import {queryParams} from './queryParams'
import {icon as ExternalLinkIcon, preview as externalLinkPreview} from './externalLink'
import {icon as InternalLinkIcon, preview as internalLinkPreview} from './internalLink'
import {icon as MediaLinkIcon, preview as mediaLinkPreview} from './mediaLink'
import {LINK_REFERENCE_TYPES} from '../lib/constants'

export const action = defineType({
  name: 'action',
  title: 'Action',
  type: 'object',
  icon: <Link2Icon size="1em" />,
  preview: {
    select: {
      title: 'text',
      to: 'to.0',
      internalTitle: 'to.0.link.document.title',
      internalSlug: 'to.0.link.document.slug.current',
      internalAnchor: 'to[0].anchor',
      internalParams: 'to[0].params',
      mediaFilename: 'to.0.link.file.asset.originalFilename',
    },
    prepare(selection) {
      console.log('selection', selection)
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
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'to',
      title: 'To (Choose one)',
      description: 'Link to an internal reference, external or relative URL, or a file.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'internal',
          title: 'Internal Link',
          icon: InternalLinkIcon,
          fields: [internalLinkField(LINK_REFERENCE_TYPES), anchorField, queryParams()],

          preview: {
            select: {
              title: 'link.document.title',
              slug: 'link.document.slug.current',
              anchor: 'anchor',
              params: 'params',
            },
            prepare({title, slug, anchor, params}) {
              let subtitle = ''
              if (slug) {
                subtitle += `/${slug}`
              }
              if (params) {
                subtitle += `?${params.map(({key, value}: QueryParams) => `${key}=${value}`).join('&')}`
              }
              if (anchor) {
                subtitle += `#${anchor}`
              }

              return internalLinkPreview({
                title,
                path: subtitle,
                outputOnly: true,
              }) as PreviewValue
            },
          },
        },
        {
          type: 'object',
          name: 'external',
          title: 'External Link',
          icon: ExternalLinkIcon,
          fields: [externalLinkField],
          preview: externalLinkPreview({
            prefix: 'link',
          }) as PreviewConfig,
        },
        {
          name: 'relative',
          title: 'Relative URL',
          type: 'object',
          icon: <ArrowRightIcon size="1em" />,
          fields: [
            defineField({
              name: 'url',
              title: 'Relative URL',
              description: 'Example: /a-relative-url',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
        {
          type: 'object',
          name: 'media',
          title: 'Media Link',
          icon: MediaLinkIcon,
          fields: [mediaLinkField],
          preview: mediaLinkPreview({
            prefix: 'link',
          }) as PreviewConfig,
        },
      ],
      validation: (Rule) => Rule.required().max(1),
    }),
  ],
})
