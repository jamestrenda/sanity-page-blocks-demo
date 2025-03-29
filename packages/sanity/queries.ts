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
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`

const actionsFragment = /* groq */ `
  actions[] {
    _type,
    _key,
    ...action {
      text,
      "text": select(
        defined(text) => { text },
        to[0]._type == "internal" => {
          to[0].link.document->_type == "page" => {
            "text": to[0].link.document->title
          }
        },
        {
          text
        }
      ).text,
      ...select(
        to[0]._type == "internal" => {
          to[0].link.document->_type == "page" => {
            "url": coalesce(to[0].link.document->slug.current  + 
                select(defined(to[0].params) => "?" + array::join(to[0].params[]{"param": key + "=" + value}.param, "&")
              )
              + select(
                defined(to[0].anchor) => '#' + to[0].anchor, ''
              ), to[0].link.document->slug.current, '#')
          }
        },
        to[0]._type == "external" => {
          "url": to[0].link.url,
          newWindow
        },
        to[0]._type == "relative" => {
          "url": to[0].url,
        },
        {
          url
        }
      )
    }
  }
`

const heroBlock = /* groq */ `
  _type == "heroBlock" => {
    ...,
    ${customImageFragment},
    ${actionsFragment}
  }
`

const blocksFragment = /* groq */ `
  ...,
  _type,
  ${heroBlock}
`

export const INDEX_QUERY = defineQuery(`*[_id == "homeSettings"][0].homepage-> {
    _id,
    _type,
    "slug": coalesce(slug.current, ""),
    blocks[] {
      ${blocksFragment}
    },
  }`)
