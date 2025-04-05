import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {getEnv} from '@repo/utils/env'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {iconPicker} from 'sanity-plugin-icon-picker'
import {codeInput} from '@sanity/code-input'
import {blocks} from './lib/blocks'

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
    ...blocks,
  ],
  schema: {
    types: schemaTypes,
  },
})
