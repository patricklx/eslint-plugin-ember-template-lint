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
const rules = require('./eslint-rules');
const processor = require('./processor');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


module.exports = {
  rules: rules,
  configs: {
    base,
    ...configs.default
  },
  processors: {
    'noop': processor,
  }
};
