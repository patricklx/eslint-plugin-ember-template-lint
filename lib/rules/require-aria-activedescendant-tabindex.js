"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ariaQuery = require("aria-query");
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _isInteractiveElement = require("../helpers/is-interactive-element.js");
var _base = require("./_base.js");
const HTML_TAGS = new Set(_ariaQuery.dom.keys());
const ERROR_MESSAGE = 'A generic element using the aria-activedescendant attribute must have a tabindex';
class RequireAriaActivedescendantTabindex extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let hasAriaActivedescendant = _astNodeInfo.hasAttribute(node, 'aria-activedescendant');
        if (!hasAriaActivedescendant) {
          return;
        }
        // Bypass validation of custom components, since we do not know what HTML tags they have
        if (!HTML_TAGS.has(node.tag)) {
          return;
        }
        const tabindex = _astNodeInfo.findAttribute(node, 'tabindex');
        let tabindexValue = Number.naN;
        // Allow for interactive elements that do not specify a tabindex, since they are inherently keyboard-focusable.
        if (!tabindex && _isInteractiveElement(node)) {
          return;
        }
        if (tabindex) {
          switch (tabindex.value.type) {
            case 'GlimmerMustacheStatement':
              {
                if (tabindex.value.path) {
                  if (['GlimmerBooleanLiteral', 'GlimmerNumberLiteral', 'GlimmerStringLiteral'].includes(tabindex.value.path.type)) {
                    tabindexValue = tabindex.value.path.original;
                  }
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
        }

        if (tabindexValue === Number.naN || tabindexValue < 0) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = RequireAriaActivedescendantTabindex;
module.exports = exports.default;