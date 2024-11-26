module.exports = {
  parserOptions: {
    'ecmaVersion': 'latest',
    sourceType: 'module',
  },
  plugins: ['n', 'jest'],
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:n/recommended',
  ],
  'rules': {
    'n/no-unpublished-require': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
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
