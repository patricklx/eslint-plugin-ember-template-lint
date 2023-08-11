"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _isAngleBracketComponent = require("../helpers/is-angle-bracket-component.js");
var _base = require("./_base.js");
const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const ERROR_MESSAGE = 'Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.';
function hasText(textNode) {
  const nbspRemoved = textNode.chars.replace(/&nbsp;/g, ' ');
  return nbspRemoved.trim().length > 0;
}
function isHidden(element) {
  const ariaHiddenAttr = _astNodeInfo.findAttribute(element, 'aria-hidden');
  return ariaHiddenAttr && ariaHiddenAttr.value.chars === 'true' || _astNodeInfo.hasAttribute(element, 'hidden');
}
function hasAllowedNode(nodes, scope) {
  for (const node of nodes) {
    const {
      type
    } = node;
    if (['GlimmerMustacheStatement', 'GlimmerBlockStatement'].includes(type)) {
      return true;
    }
    if (type === 'GlimmerTextNode' && hasText(node)) {
      return true;
    }
    if (type === 'GlimmerElementNode') {
      if (_isAngleBracketComponent(scope, node)) {
        return true;
      }
      if (!isHidden(node) && _astNodeInfo.hasChildren(node)) {
        if (hasAllowedNode(_astNodeInfo.childrenFor(node), scope)) {
          return true;
        }
      }
    }
  }
  return false;
}
class NoEmptyHeadings extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        const role = _astNodeInfo.findAttribute(node, 'role');
        const hasHeadingRole = role && role.value.chars === 'heading';
        if (HEADINGS.has(node.tag) || hasHeadingRole) {
          if (isHidden(node)) {
            return;
          }
          if (!_astNodeInfo.hasChildren(node)) {
            this.log({
              message: ERROR_MESSAGE,
              node
            });
            return;
          }
          const childNodes = _astNodeInfo.childrenFor(node);
          if (hasAllowedNode(childNodes, this.scope)) {
            return;
          }
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = NoEmptyHeadings;
module.exports = exports.default;