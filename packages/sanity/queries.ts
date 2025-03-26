import {defineQuery} from 'next-sanity'

const imageFragment = /* groq */ `
  image {
    ...,
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`

const heroBlock = /* groq */ `
  _type == "heroBlock" => {
    ...,
    ${imageFragment}
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
