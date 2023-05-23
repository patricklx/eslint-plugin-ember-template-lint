/**
 * @fileoverview Provide linting for hbs template literals inside of JavaScript
 * @author Peter Banka
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const configs = require('./config')
const base = require('./config/base')
const templateRules = require('./ember-teplate-lint/info')

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
    'noop': {
      preprocess: (text, filename) => [{text, filename}],
      postprocess: (messages) => messages.flat(),
      supportsAutofix: true
    }
  }
}
