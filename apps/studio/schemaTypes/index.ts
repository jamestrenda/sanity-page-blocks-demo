import {action} from './action'
import actions from './actions'
import menu from './menu'
import {page} from './page'
import {generalSettings} from './singletons/settings/general'
import {home} from './singletons/settings/home'

export const schemaTypes = [generalSettings, home, action, menu, page]
