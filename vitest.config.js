import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      all: true,
      exclude: [...configDefaults.exclude, './dist', '__mocks__'],
      provider: 'istanbul',
    },
  },
})
