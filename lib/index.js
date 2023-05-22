/**
 * @fileoverview Provide linting for hbs template literals inside of JavaScript
 * @author Peter Banka
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');
const hbs = require('./hbs-preprocessor');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  configs: requireIndex(`${__dirname}/config`),
  processors: {
    '.hbs': hbs,
  }
}
