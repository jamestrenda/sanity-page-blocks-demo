import {defineField} from 'sanity'

export const iconField = defineField({
  name: 'icon',
  title: 'Icon',
  options: {
    storeSvg: true,
    providers: ['fi', 'si'],
  },
  type: 'iconPicker',
})
