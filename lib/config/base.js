module.exports = {
  root: true,

  plugins: ['ember-template-lint'],

  rules: {},

  overrides: [
    {
      files: ['**/*.hbs'],
      parser: require.resolve('../parser/hbs-parser'),
      processor: 'ember-template-lint/noop'
    },
    {
      files: ['**/*.gts', '**/*.gjs'],
      parser: 'ember-eslint-parser',
      processor: 'ember-template-lint/noop'
    },
  ],
};
