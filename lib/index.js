/**
 * @fileoverview Provide linting for hbs template literals inside of JavaScript
 * @author Peter Banka
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const configs = require('./config');
const base = require('./config/base');
const templateRules = require('./ember-teplate-lint/info');
const processor = require('./processor');

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
  },
  processors: {
    'noop': processor,
  }
};
