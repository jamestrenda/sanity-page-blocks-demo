import {defineField, ReferenceTo} from 'sanity'

import {internalLink} from './internalLink'

export const internalLinkField = (types: ReferenceTo) => defineField(internalLink(types))
