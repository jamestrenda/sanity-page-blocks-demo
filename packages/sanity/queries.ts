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
  "image": customImage.file {
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
      }.url,
      action.to[0]._type == "media" => {
        "url": action.to[0].link.file.asset->url,
      }.url
    ),
    "newWindow": select(
      action.to[0]._type == "external" => {
        "newWindow": action.to[0].link.newWindow
      },
      action.to[0]._type == "media" => {
        "newWindow": true
      }
    ).newWindow,
    "download": select(
      action.to[0]._type == "media" => {
        "download": true
      }
    ).download,
    "icon": action.icon,
  }
`

const callToActionBlock = /* groq */ `
  _type == "callToActionBlock" => {
    _type,
    _key,
    text,
    ${customImageFragment},
    ${actionsFragment}
  }
`

const heroBlock = /* groq */ `
  _type == "heroBlock" => {
    _type,
    _key,
    text,
    ${customImageFragment},
    ${actionsFragment}
  }
`

const textBlockFragment = /* groq */ `
  _type,
  _key,
  text
`

const textBlock = /* groq */ `
  _type == "textBlock" => {
    ${textBlockFragment}
  }
`

const headerTextBlock = /* groq */ `
  header._type == "headerTextBlock" => {
    "text": header.text,
  }
`

const faqBlock = /* groq */ `
  _type == "faqBlock" => {
    _type,
    _key,
    "header": select(
      ${headerTextBlock},
      defined(title) => title,
    ),
    faqs[]-> {
      _type,
      _id,
      question,
      answer
    }
  }
`

const carouselBlock = /* groq */ `
  _type == "carouselBlock" => {
    _type,
    _key,
    items[] {
      ${heroBlock}
    }
  }
`

const containerBlock = /* groq */ `
  _type == "containerBlock" || _type == "fullBleedContainerBlock" => {
    _type,
    _key,
    content[] {
      ${textBlock}
    },
    ${customImageFragment}
  }
`

const blocksFragment = /* groq */ `
  _key,
  _type,
  ${callToActionBlock},
  ${carouselBlock},
  ${containerBlock},
  ${faqBlock},
  ${heroBlock},
  ${textBlock}
`

const pageFragment = /* groq */ `
  ...,
  "slug": coalesce(slug.current, ""),
  blocks[] {
    ${blocksFragment}
  },
`

export const INDEX_QUERY = defineQuery(`*[_id == "homeSettings"][0].homepage-> {
  ${pageFragment}
}`)

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ${pageFragment}
}`)

export const PAGE_PATHS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)].slug.current
`)

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
        }.url,
        to[0]._type == "media" => {
          "url": to[0].link.file.asset->url,
        }.url
      ),
      "newWindow": select(
        to[0]._type == "external" => {
          "newWindow": to[0].link.newWindow
        },
        to[0]._type == "media" => {
          "newWindow": true
        }
      ).newWindow,
    }
  }
`)
