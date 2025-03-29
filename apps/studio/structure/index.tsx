import {map} from 'rxjs'
import type {StructureResolver} from 'sanity/structure'
import {getHomepageObservable} from '../lib/utils'
import {Icon as HomeSettingsIcon} from '../schemaTypes/singletons/settings/home'
import {Icon as PageIcon} from '../schemaTypes/page'
import {HomeIcon, SettingsIcon} from 'lucide-react'
import {apiVersion} from '../sanity.config'
import {icon as MenuIcon} from '../schemaTypes/menu'

export const structure: StructureResolver = async (S, context) => {
  const homeSettings = S.defaultDocument({
    schemaType: 'homeSettings',
    documentId: 'homeSettings',
  }).title('Home Settings')

  const homeSettingsListItem = S.listItem()
    .title('Home')
    .id('home')
    .icon(HomeSettingsIcon)
    .child(homeSettings)

  const getHomepage = () =>
    getHomepageObservable(context.documentStore).pipe(
      map((id) => {
        if (!id) return homeSettings // if no homepage has been set, show the home settings singleton
        return S.document() // otherwise, show the actual homepage
          .schemaType('page')
          .documentId(id)
      }),
    )

  const home = S.listItem().title('Home').icon(HomeIcon).child(getHomepage)

  const getFilteredPages = () =>
    getHomepageObservable(context.documentStore).pipe(
      map((id) => {
        return S.documentTypeList('page')
          .filter(
            `_type == "page" && ($id == null || _id != $id && !(_id in path("drafts." + $id)))`,
          )
          .params({
            id,
          })
          .apiVersion(apiVersion)
          .title('Pages')
      }),
    )

  const pages = S.listItem().title('Pages').icon(PageIcon).child(getFilteredPages)

  const settings = S.listItem()
    .title('Settings')
    .icon(SettingsIcon)
    .child(
      S.list()
        .title('Settings')
        .items([
          homeSettingsListItem,
          S.listItem()
            .title('Menus')
            .icon(MenuIcon)
            .child(S.documentTypeList('menu').title('Menus')),
        ]),
    )

  // Dynamically decide whether to show the home item and divider
  return getHomepageObservable(context.documentStore).pipe(
    map((homepageId) => {
      const items = [pages, S.divider(), settings]

      if (homepageId) {
        items.unshift(home, S.divider()) // Show home and a divider if a homepage is set
      }

      return S.list().id('root').title('Content').items(items)
    }),
  )
}

//   const HeaderIcon = () => {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         height="1em"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-panel-top-dashed"
//       >
//         <rect width="18" height="18" x="3" y="3" rx="2" />
//         <path d="M14 9h1" />
//         <path d="M19 9h2" />
//         <path d="M3 9h2" />
//         <path d="M9 9h1" />
//       </svg>
//     );
//   };

//   const FooterIcon = () => {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         height="1em"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-panel-bottom-dashed"
//       >
//         <rect width="18" height="18" x="3" y="3" rx="2" />
//         <path d="M14 15h1" />
//         <path d="M19 15h2" />
//         <path d="M3 15h2" />
//         <path d="M9 15h1" />
//       </svg>
//     );
//   };

//
