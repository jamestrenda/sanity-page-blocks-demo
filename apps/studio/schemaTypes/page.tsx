import {FileIcon} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const Icon = FileIcon

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: <Icon size="1em" />,
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
      of: [{type: 'heroBlock'}, {type: 'textBlock'}],
    }),
  ],
})
