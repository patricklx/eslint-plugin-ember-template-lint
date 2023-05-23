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
      parser: require.resolve('../parser/gts-parser'),
      processor: 'ember-template-lint/noop'
    },
  ],
};
