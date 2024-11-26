import globals from 'globals';
import js from '@eslint/js';

import config from 'eslint-plugin-ember-template-lint/lib/config/index.js';

import emberParser from 'ember-eslint-parser';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        babelOptions: {
          plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
    },
  },
  {
    files: ['**/*.gjs'],
    languageOptions: {
      parser: emberParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        babelOptions: {
          plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      ...config.config.plugins,
    },
    rules: {
      ...config.config.rules,
    },
  },
];
