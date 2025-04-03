import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {textBlock, heroBlock, carouselBlock} from '@trenda/sanity-plugin-page-blocks'
import {structure} from './structure'
import {getEnv} from '@repo/utils/env'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {iconField} from './schemaTypes/iconField'
import {iconPicker} from 'sanity-plugin-icon-picker'
import {codeInput} from '@sanity/code-input'

export const apiVersion = getEnv().SANITY_STUDIO_API_VERSION

export default defineConfig({
  name: 'default',
  title: 'Sanity Page Blocks Demo',
  projectId: 'm4r91ysr',
  dataset: 'production',
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    unsplashImageAsset(),
    iconPicker(),
    codeInput(),
    carouselBlock({
      items: {
        of: [
          {
            type: 'heroBlock',
          },
        ],
      },
    }),
    heroBlock({
      text: {
        styles: [
          {
            title: 'Heading',
            value: 'h1',
          },
          {
            title: 'Overline',
            value: 'overline',
            component: (props) => (
              <span
                style={{
                  fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`,
                  margin: 0,
                  fontSize: '.875em',
                  fontWeight: 600,
                  backgroundColor: 'oklch(0.94 0 0)',
                  color: 'oklch(0 0 0)',
                  padding: '6px 16px',
                  borderRadius: '100px',
                }}
              >
                {props.children}
              </span>
            ),
          },
        ],
      },
      actions: {
        internal: {
          types: [{type: 'page'}],
        },
        customFields: [iconField],
      },
    }),
    textBlock({
      text: {
        styles: [
          {
            title: 'Heading 1',
            value: 'h1',
          },
          {
            title: 'Heading 2',
            value: 'h2',
          },
          {
            title: 'Heading 3',
            value: 'h3',
          },
          {
            title: 'Heading 4',
            value: 'h4',
          },
          {
            title: 'Heading 5',
            value: 'h5',
          },
          {
            title: 'Blockquote',
            value: 'blockquote',
          },
          {
            title: 'Overline',
            value: 'overline',
            component: (props) => (
              <span
                style={{
                  fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`,
                  margin: 0,
                  fontSize: '.875em',
                  fontWeight: 600,
                  backgroundColor: 'oklch(0.94 0 0)',
                  padding: '6px 16px',
                  borderRadius: '100px',
                }}
              >
                {props.children}
              </span>
            ),
          },
        ],
        blocks: [
          {
            title: 'Image',
            type: 'image',
          },
          {
            type: 'code',
          },
        ],
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
