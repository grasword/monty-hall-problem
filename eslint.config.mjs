import { axiom } from '@2bad/axiom'

export default [
  axiom(import.meta.dirname),
  {
    rules: {
      'import-x/no-default-export': 'off',
      'jsdoc/require-jsdoc': 'off',
      'n/no-unpublished-import': 'off'
    }
  }
].flat()
