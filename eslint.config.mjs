import { axiom } from '@2bad/axiom'

export default [
  axiom(import.meta.dirname),
  {
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'import-x/no-default-export': 'off',
      'n/no-unpublished-import': [
        'error',
        {
          allowModules: [
            'vite',
            'vitest',
            '@vitejs/plugin-react',
            '@wdio/globals',
            '@testing-library/jest-dom',
            '@testing-library/react'
          ]
        }
      ]
    }
  }
].flat()
