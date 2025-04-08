import {
  callToActionBlock,
  carouselBlock,
  containerBlock,
  faqBlock,
  getPortableTextPreview,
  heroBlock,
  textBlock,
} from '@trenda/sanity-plugin-page-blocks'
import {defineField} from 'sanity'
import Overline from '../components/Overline'
import {iconField} from '../schemaTypes/iconField'
import {RatioIcon} from 'lucide-react'

export const blocks = [
  callToActionBlock(),
  carouselBlock({
    items: {
      of: [
        {
          type: 'heroBlock',
        },
      ],
    },
  }),
  containerBlock({
    content: {
      of: [
        {
          type: 'textBlock',
        },
      ],
    },
  }),
  containerBlock({
    name: 'fullBleedContainerBlock',
    content: {
      of: [
        {
          type: 'textBlock',
        },
        // ... other block types
      ],
    },
    preview: {
      select: {
        title: 'title',
      },
      prepare(selection) {
        return {
          title: selection.title,
          subtitle: 'Full-Bleed Container Block',
          media: <RatioIcon size="1em" />,
        }
      },
    },
  }),

  faqBlock({
    header: defineField({
      name: 'header',
      title: 'Header',
      type: 'headerTextBlock',
    }),
    faqs: {
      schemaType: [
        {
          type: 'faq',
        },
      ],
    },
    preview: {
      select: {
        title: 'header.text',
      },
      prepare(selection) {
        const blockTitle = 'FAQ Block'
        const preview = getPortableTextPreview(selection.title, blockTitle)
        return preview
      },
    },
  }),
  heroBlock({
    text: {
      styles: [
        {
          title: 'Heading',
          value: 'h1',
        },
        {
          title: 'Overline',
          value: 'overline',
          component: (props) => (
            <span
              style={{
                fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`,
                margin: 0,
                fontSize: '.875em',
                fontWeight: 600,
                backgroundColor: 'oklch(0.94 0 0)',
                color: 'oklch(0 0 0)',
                padding: '6px 16px',
                borderRadius: '100px',
              }}
            >
              {props.children}
            </span>
          ),
        },
      ],
    },
    image: {
      validation: (Rule) => Rule.required(),
      file: {
        validation: (Rule) =>
          Rule.custom((value, context) => {
            // Check if alt text exists but image doesn't
            const parent = context?.parent as {altText?: string}
            if (parent?.altText && !value?.asset?._ref) {
              return 'Image is required when alt text is provided'
            }

            return true // Validation passes
          }),
      },
    },
    actions: {
      internal: {
        types: [{type: 'page'}],
      },
      customFields: [iconField],
    },
  }),
  textBlock({
    name: 'headerTextBlock',
    text: {
      styles: [
        {
          title: 'Overline',
          value: 'overline',
          component: Overline,
        },
        {
          title: 'Heading 2',
          value: 'h2',
        },
      ],
      lists: [],
      annotations: [],
    },
  }),
  textBlock({
    text: {
      styles: [
        {
          title: 'Heading 1',
          value: 'h1',
        },
        {
          title: 'Heading 2',
          value: 'h2',
        },
        {
          title: 'Heading 3',
          value: 'h3',
        },
        {
          title: 'Heading 4',
          value: 'h4',
        },
        {
          title: 'Heading 5',
          value: 'h5',
        },
        {
          title: 'Blockquote',
          value: 'blockquote',
        },
        {
          title: 'Overline',
          value: 'overline',
          component: Overline,
        },
      ],
      blocks: [
        {
          title: 'Image',
          type: 'image',
        },
        {
          type: 'code',
        },
      ],
    },
  }),
]
