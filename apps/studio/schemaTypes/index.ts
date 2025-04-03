import {action} from './action'
import {faq} from './faq'
import menu from './menu'
import {page} from './page'
import {generalSettings} from './singletons/settings/general'
import {home} from './singletons/settings/home'

export const schemaTypes = [faq, generalSettings, home, action, menu, page]
