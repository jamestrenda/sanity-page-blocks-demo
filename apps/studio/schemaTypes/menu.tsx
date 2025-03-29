import {MenuIcon} from 'lucide-react'
import {defineField} from 'sanity'

export const icon = <MenuIcon size="1em" />

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'menuItem',
        },
      ],
      validation: (Rule) => [Rule.min(1)],
    }),
  ],
}
