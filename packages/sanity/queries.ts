import {defineQuery} from 'next-sanity'

const imageFragment = /* groq */ `
  image {
    ...,
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`

const customImageFragment = /* groq */ `
  "image": customImage.image {
    ...,
    "altText": coalesce(^.customImage.altText, asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`

const actionsFragment = /* groq */ `
  actions[] {
    _type,
    _key,
    "text": select(
      defined(action.text) => {
        "text": action.text,
      },
      action.to[0]._type == "internal" => {
        action.to[0].link.document->_type == "page" => {
          "text": action.to[0].link.document->title
        }
      },
    ).text,
    "url": select(
      action.to[0]._type == "internal" => {
        action.to[0].link.document->_type == "page" => {
          "url":
          coalesce(action.to[0].link.document->slug.current  + 
            select(defined(action.to[0].params) => "?" + array::join(action.to[0].params[]{"param": key + "=" + value}.param, "&")
          )
          + select(
            defined(action.to[0].anchor) => '#' + action.to[0].anchor, ''
          ), action.to[0].link.document->slug.current, '#')
        }
      }.url,
      action.to[0]._type == "external" => {
        "url": action.to[0].link.url,
        newWindow
      }.url,
      action.to[0]._type == "relative" => {
        "url": action.to[0].url,
      }.url
    ),
    "newWindow": select(action.to[0]._type == "external" => {
      "newWindow": action.to[0].link.newWindow
    }).newWindow,
    "icon": action.icon,
  }
`

const heroBlock = /* groq */ `
  _type == "heroBlock" => {
    _type,
    _type,
    text,
    ${customImageFragment},
    ${actionsFragment}
  }
`

const textBlock = /* groq */ `
  _type == "textBlock" => {
    _type,
    _type,
    text,
  }
`

const blocksFragment = /* groq */ `
  _key,
  _type,
  ${heroBlock},
  ${textBlock}
`

export const INDEX_QUERY = defineQuery(`*[_id == "homeSettings"][0].homepage-> {
  _id,
  _type,
  "slug": coalesce(slug.current, ""),
  blocks[] {
    ${blocksFragment}
  },
}`)

export const SETTINGS_QUERY = defineQuery(`{
  "general": *[_id == "generalSettings"][0] {
    _id,
    _type,
    repo,
    headerMenu-> {
      _id,
      _type,
      ${actionsFragment}
    }
  }
}`)

export const HEADER_MENU_QUERY =
  defineQuery(`*[_id == "generalSettings" && defined(headerMenu)][0].headerMenu-> {
    _id,
    _type,
    const,
    actions[] {
      _type,
      _key,
      "text": select(
        defined(text) => {
          "text": text,
        },
        to[0]._type == "internal" => {
          to[0].link.document->_type == "page" => {
            "text": to[0].link.document->title
          }
        },
      ).text,
      "url": select(
        to[0]._type == "internal" => {
          to[0].link.document->_type == "page" => {
            "url":
            coalesce(to[0].link.document->slug.current  + 
              select(defined(to[0].params) => "?" + array::join(to[0].params[]{"param": key + "=" + value}.param, "&")
            )
            + select(
              defined(to[0].anchor) => '#' + to[0].anchor, ''
            ), to[0].link.document->slug.current, '#')
          }
        }.url,
        to[0]._type == "external" => {
          "url": to[0].link.url,
          newWindow
        }.url,
        to[0]._type == "relative" => {
          "url": to[0].url,
        }.url
      ),
      "newWindow": select(to[0]._type == "external" => {
        "newWindow": to[0].link.newWindow
      }).newWindow,
    }
  }
`)
