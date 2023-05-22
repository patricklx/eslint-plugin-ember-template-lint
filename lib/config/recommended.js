module.exports = {
  root: true,

  plugins: ['ember-template'],

  rules: {
    'ember-template/lint': 'error'
  },

  overrides: [
    {
      files: ['**/*.hbs'],
      processor: 'ember-template/.hbs',
    },
  ],
};
