import {Settings2Icon} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const Icon = Settings2Icon

export const generalSettings = defineType({
  name: 'generalSettings',
  title: 'General',
  type: 'document',
  icon: <Icon size="1em" />,
  fields: [
    defineField({
      name: 'repo',
      title: 'Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'headerMenu',
      title: 'Header Menu',
      type: 'reference',
      to: {type: 'menu'},
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'reference',
      to: {type: 'menu'},
      options: {
        disableNew: true,
      },
    }),
  ],
})
