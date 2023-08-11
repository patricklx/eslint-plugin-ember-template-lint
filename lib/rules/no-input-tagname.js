"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const message = 'Unexpected `tagName` usage on {{input}} helper.';
function firstComponentParamIsInput(node) {
  return node && Array.isArray(node.params) && node.params[0] && node.params[0].original === 'input';
}
function hasTagNameAttr(attrs) {
  for (const attr of attrs) {
    if (attr.key === 'tagName') {
      return true;
    }
  }
  return false;
}
class NoInputTagname extends _base {
  _checkForInputTagName(node) {
    let attrs = (node.hash || {}).pairs || [];
    if (node.path.original === 'input' && hasTagNameAttr(attrs)) {
      this.log({
        message,
        node
      });
    } else if (node.path.original === 'component' && firstComponentParamIsInput(node) && hasTagNameAttr(attrs)) {
      this.log({
        message,
        node
      });
    }
  }
  visitor() {
    return {
      GlimmerMustacheStatement(node) {
        this._checkForInputTagName(node);
      },
      GlimmerSubExpression(node) {
        this._checkForInputTagName(node);
      }
    };
  }
}
exports.default = NoInputTagname;
module.exports = exports.default;