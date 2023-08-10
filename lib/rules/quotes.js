"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createErrorMessage = _interopRequireDefault(require("../helpers/create-error-message.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Quotes extends _base.default {
  parseConfig(config) {
    let configType = typeof config;
    switch (configType) {
      case 'boolean':
        {
          if (!config) {
            return false;
          }
          return {
            curlies: 'single',
            html: 'single'
          };
          break;
        }
      case 'string':
        {
          if (['double', 'single'].includes(config)) {
            return {
              curlies: config,
              html: config
            };
          }
          break;
        }
      case 'object':
        {
          if (Object.keys(config).length === 2 && ['double', 'single', false].includes(config.curlies) && ['double', 'single', false].includes(config.html)) {
            if (!config.curlies && !config.html) {
              return false;
            }
            return config;
          }
          break;
        }
      case 'undefined':
        {
          return false;
        }
    }
    let errorMessage = (0, _createErrorMessage.default)(this.ruleName, ['  * "double" - requires the use of double quotes wherever possible', '  * "single" - requires the use of single quotes wherever possible', '  * { curlies: "single"|"double"|false, html: "single"|"double"|false } - requires different quotes for Handlebars and HTML syntax'], config);
    throw new Error(errorMessage);
  }
  visitor() {
    const chars = {
      single: "'",
      double: '"'
    };
    const goodChars = {
      curlies: chars[this.config.curlies],
      html: chars[this.config.html]
    };
    const badChars = {};
    if (goodChars.curlies) {
      badChars.curlies = goodChars.curlies === chars.single ? chars.double : chars.single;
    }
    if (goodChars.html) {
      badChars.html = goodChars.html === chars.single ? chars.double : chars.single;
    }
    let message;
    if (goodChars.curlies === chars.single && goodChars.html === chars.single) {
      message = 'you must use single quotes in templates';
    } else if (goodChars.curlies === chars.double && goodChars.html === chars.double) {
      message = 'you must use double quotes in templates';
    } else if (!goodChars.curlies || !goodChars.html) {
      const correctQuote = goodChars.curlies === chars.single || goodChars.html === chars.single ? 'single' : 'double';
      message = `you must use ${correctQuote} quotes in ${goodChars.curlies ? 'Handlebars syntax' : 'HTML attributes'}`;
    } else {
      const double = goodChars.curlies === chars.double ? 'Handlebars syntax' : 'HTML attributes';
      const single = goodChars.curlies === chars.single ? 'Handlebars syntax' : 'HTML attributes';
      message = `you must use double quotes for ${double} and single quotes for ${single} in templates`;
    }
    return {
      GlimmerAttrNode(node) {
        if (!goodChars.html) {
          return;
        }
        if (!node.isValueless && node.quoteType === badChars.html) {
          if (attrValueHasChar(node.value, goodChars.html)) {
            // TODO: Autofix blocked on: https://github.com/ember-template-lint/ember-template-recast/issues/698
            return this.log({
              message,
              node
            });
          }
          if (this.mode === 'fix') {
            node.quoteType = goodChars.html;
          } else {
            return this.log({
              message,
              node,
              isFixable: true
            });
          }
        }
      },
      GlimmerStringLiteral(node, path) {
        if (!goodChars.curlies) {
          return;
        }
        let errorSource = this.sourceForNode(path.parentNode);
        if (node.quoteType === badChars.curlies) {
          if (node.value.includes(goodChars.curlies)) {
            // TODO: Autofix blocked on: https://github.com/ember-template-lint/ember-template-recast/issues/698
            return this.log({
              message,
              node,
              source: errorSource
            });
          }
          if (this.mode === 'fix') {
            node.quoteType = goodChars.curlies;
          } else {
            return this.log({
              message,
              node,
              source: errorSource,
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = Quotes;
function attrValueHasChar(node, ch) {
  if (node.type === 'GlimmerTextNode') {
    return node.chars.includes(ch);
  } else if (node.type === 'GlimmerConcatStatement') {
    return node.parts.some(n => {
      return n.type === 'GlimmerTextNode' && n.chars.includes(ch);
    });
  }
  return false;
}