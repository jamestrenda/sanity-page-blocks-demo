import {Settings2Icon} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const Icon = Settings2Icon

export const home = defineType({
  name: 'homeSettings',
  title: 'Home Settings',
  type: 'document',
  icon: <Icon size="1em" />,
  fields: [
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'reference',
      description: 'Choose a page to display as the homepage',
      to: {type: 'page'},
      options: {
        disableNew: true,
      },
    }),
  ],
})
