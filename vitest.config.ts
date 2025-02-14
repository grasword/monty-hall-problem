import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['build', 'node_modules'],
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    coverage: {
      exclude: ['build', ...coverageConfigDefaults.exclude],
      provider: 'v8'
    }
  },
  plugins: [tsconfigPaths()]
})
