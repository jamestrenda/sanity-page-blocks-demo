import {home} from '../schemaTypes/singletons/settings/home'

export const SINGLETON_TYPES = new Set([home.name, 'media.tag'])

export const LINK_REFERENCE_TYPES = [
  {
    title: 'Page',
    type: 'page',
  },
]
