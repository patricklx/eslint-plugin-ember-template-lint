module.exports = {
  root: true,

  plugins: ['ember-template-lint'],

  rules: {},

  overrides: [
    {
      files: ['**/*.hbs'],
      parser: require.resolve('../parser/hbs-parser')
    },
    {
      files: ['**/*.gts'],
      parser: require.resolve('../parser/gts-parser'),
      processor: undefined
    },
    {
      files: ['**/*.gjs', '**/*.js'],
      parser: require.resolve('../parser/gjs-parser'),
      processor: undefined
    },
  ],
};
