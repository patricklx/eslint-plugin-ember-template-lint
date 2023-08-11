"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createErrorMessage = require("../helpers/create-error-message.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Do not use the `action` modifier. Instead, use the `on` modifier.';
class NoActionModifiers extends _base {
  parseConfig(config) {
    switch (typeof config) {
      case 'boolean':
        {
          if (config) {
            return {
              allowlist: []
            };
          } else {
            return false;
          }
        }
      case 'object':
        {
          if (Array.isArray(config)) {
            return {
              allowlist: config
            };
          }
          break;
        }
      case 'undefined':
        {
          return false;
        }
    }
    let errorMessage = _createErrorMessage(this.ruleName, ['  * array of strings - tag names of elements that can accept {{action}} modifiers'], config);
    throw new Error(errorMessage);
  }
  visitor() {
    return {
      GlimmerElementModifierStatement(node, {
        parentNode
      }) {
        let modifierName = node.path.original;
        if (modifierName !== 'action') {
          return;
        }
        if (this.config.allowlist.includes(parentNode.tag)) {
          return;
        }
        this.log({
          message: ERROR_MESSAGE,
          node,
          source: this.sourceForNode(parentNode)
        });
      }
    };
  }
}
exports.default = NoActionModifiers;
module.exports = exports.default;