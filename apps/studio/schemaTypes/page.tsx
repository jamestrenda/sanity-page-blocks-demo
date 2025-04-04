import {FileIcon} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {seoFields} from './seoFields'
import {GROUPS} from '../lib/constants'

export const Icon = FileIcon

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: GROUPS,
  icon: () => <Icon size="1em" />,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {type: 'carouselBlock'},
        {type: 'containerBlock'},
        {type: 'fullBleedContainerBlock', title: 'Full Bleed Container'},
        {type: 'faqBlock'},
        {type: 'heroBlock'},
        {type: 'textBlock'},
      ],
    }),
    ...seoFields,
  ],
})
