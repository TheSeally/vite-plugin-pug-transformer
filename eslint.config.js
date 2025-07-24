import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**'] },

  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.es6,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'prefer-const': 'error'
    }
  },

  ...(process.env.CI ? [{
    rules: {
      'linebreak-style': ['error', 'unix'],
    }
  }] : [])
];