'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
   'no-bare-strings': 'error',
   'no-inline-styles': 'error',
  },
  overrides: [
     {
        files: [ '**/src-2/*.gjs' ],
        rules: {
           'no-bare-strings': 'off',
        },
     },
  ],
};
