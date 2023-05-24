module.exports = {
  parserOptions: {
    'ecmaVersion': 'latest',
    sourceType: 'module',
  },
  plugins: ['node', 'jest'],
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:node/recommended',
  ],
  'rules': {
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
