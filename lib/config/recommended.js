module.exports = {
  root: true,

  plugins: ['hbs-template'],

  rules: {
    'hbs-template/lint': 'error'
  },

  overrides: [
    {
      files: ['**/*.hbs'],
      processor: 'hbs-template/.hbs',
    },
  ],
};
