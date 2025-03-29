import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {textBlock, heroBlock} from '@trenda/sanity-plugin-page-blocks'
import {structure} from './structure'
import {getEnv} from '@repo/utils/env'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

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
                  textTransform: 'uppercase',
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
      },
    }),
    textBlock(),
  ],
  schema: {
    types: schemaTypes,
  },
})
