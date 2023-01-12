import { join, resolve } from 'node:path'

import postcssNesting from 'postcss-nesting'
import eslint from 'vite-plugin-eslint'
import cssInjector from 'vite-plugin-css-injected-by-js'

export default {
  root: join(__dirname, 'src'),
  build: {
    outDir: join(__dirname, 'dist'),
    sourcemap: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      name: 'korenie',
      // the proper extensions will be added
      fileName: 'korenie',
    },
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  esbuild: {
    keepNames: true,
  },
  plugins: [eslint(), cssInjector()],
}
