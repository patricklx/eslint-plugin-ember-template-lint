"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const errorMessage = 'Avoid positive integer values for tabindex.';
const errorMessageForNaNCase = 'Tabindex values must be negative numeric.';
function literalValueToNumber(astNode) {
  if (astNode.type === 'GlimmerNumberLiteral') {
    return astNode.original;
  } else if (astNode.type === 'GlimmerStringLiteral') {
    return Number.parseInt(astNode.original, 10);
  } else {
    return Number.NaN;
  }
}
function maybeLiteralValue(astNode, defaultValue) {
  if (['GlimmerNumberLiteral', 'GlimmerStringLiteral'].includes(astNode.type)) {
    return literalValueToNumber(astNode);
  } else {
    return defaultValue;
  }
}
function parseTabIndexFromMustache(mustacheNode) {
  let tabindexValue;
  if (['GlimmerNumberLiteral', 'GlimmerStringLiteral'].includes(mustacheNode.path.type)) {
    tabindexValue = literalValueToNumber(mustacheNode.path);
  } else if (mustacheNode.path.type === 'GlimmerPathExpression' && (mustacheNode.path.original === 'if' || mustacheNode.path.original === 'unless')) {
    if (mustacheNode.params.length === 2 || mustacheNode.params.length === 3) {
      tabindexValue = maybeLiteralValue(mustacheNode.params[1], tabindexValue);
    }
    if (mustacheNode.params.length === 3) {
      let maybeTabindexValue = maybeLiteralValue(mustacheNode.params[2], tabindexValue);
      if (maybeTabindexValue > tabindexValue) {
        tabindexValue = maybeTabindexValue;
      }
    }
  }
  return tabindexValue;
}
class NoPositiveTabindex extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        const tabindex = _astNodeInfo.findAttribute(node, 'tabindex');
        if (!tabindex || !tabindex.value) {
          return;
        }
        let tabindexValue = Number.NaN;
        switch (tabindex.value.type) {
          case 'GlimmerMustacheStatement':
            {
              if (tabindex.value.path) {
                tabindexValue = parseTabIndexFromMustache(tabindex.value);
              }
              break;
            }
          case 'GlimmerConcatStatement':
            {
              let part = tabindex.value.parts[0];
              if (part.type === 'GlimmerMustacheStatement') {
                tabindexValue = parseTabIndexFromMustache(part);
              }
              break;
            }
          case 'GlimmerTextNode':
            {
              tabindexValue = Number.parseInt(tabindex.value.chars, 10);
              break;
            }
          // No default
        }

        // eslint-disable-next-line unicorn/prefer-number-properties
        if (isNaN(tabindexValue)) {
          this.log({
            message: errorMessageForNaNCase,
            node,
            source: this.sourceForNode(tabindex)
          });
        } else if (tabindexValue > 0) {
          this.log({
            message: errorMessage,
            node,
            source: this.sourceForNode(tabindex)
          });
        }
      }
    };
  }
}
exports.default = NoPositiveTabindex;
module.exports = exports.default;