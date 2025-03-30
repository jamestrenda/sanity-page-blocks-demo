import {MenuIcon} from 'lucide-react'
import {defineField} from 'sanity'

export const icon = () => <MenuIcon size="1em" />

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        {
          type: 'action',
        },
      ],
      validation: (Rule) => [Rule.min(1)],
    }),
  ],
}
