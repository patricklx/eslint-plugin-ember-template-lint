/**
 * @fileoverview Provide linting for hbs template literals inside of JavaScript
 * @author Peter Banka
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const configs = require('./config-legacy');
const base = require('./config-legacy/base');
const templateRules = require('./ember-template-lint/info');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


module.exports = {
  rules: {
    ...templateRules.rules
  },
  configs: {
    base,
    ...configs
  }
};
