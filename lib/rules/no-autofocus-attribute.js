"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context';
function logAutofocusAttribute(attribute) {
  this.log({
    message: ERROR_MESSAGE,
    isFixable: false,
    node: attribute
  });
}
class NoAutofocusAttribute extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        const autofocusAttribute = _astNodeInfo.findAttribute(node, 'autofocus');
        if (autofocusAttribute) {
          logAutofocusAttribute.call(this, autofocusAttribute);
        }
      },
      GlimmerMustacheStatement(node) {
        const autofocusAttribute = node.hash.pairs.find(pair => pair.key === 'autofocus');
        if (autofocusAttribute) {
          logAutofocusAttribute.call(this, autofocusAttribute);
        }
      }
    };
  }
}
exports.default = NoAutofocusAttribute;
module.exports = exports.default;