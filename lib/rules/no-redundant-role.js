"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.parseConfig = parseConfig;
var _ariaQuery = require("aria-query");
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const DEFAULT_CONFIG = {
  checkAllHTMLElements: true
};
function createErrorMessageLandmarkElement(element, role) {
  return `Use of redundant or invalid role: ${role} on <${element}> detected. If a landmark element is used, any role provided will either be redundant or incorrect.`;
}
function createErrorMessageAnyElement(element, role) {
  return `Use of redundant or invalid role: ${role} on <${element}> detected.`;
}

// https://www.w3.org/TR/html-aria/#docconformance
const LANDMARK_ROLES = new Set(['banner', 'main', 'complementary', 'search', 'form', 'navigation', 'contentinfo']);
const allowedElementRoles = [{
  name: 'nav',
  role: 'navigation'
}, {
  name: 'form',
  role: 'search'
}, {
  name: 'ol',
  role: 'list'
}, {
  name: 'ul',
  role: 'list'
}];
class NoRedundantRole extends _base {
  parseConfig(config) {
    return parseConfig(config);
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        const hasRoleAttribute = _astNodeInfo.hasAttribute(node, 'role');
        if (!hasRoleAttribute) {
          return;
        }
        let roleAttrNode = _astNodeInfo.findAttribute(node, 'role');
        let roleValue;
        if (roleAttrNode.value.type === 'GlimmerTextNode') {
          roleValue = roleAttrNode.value.chars || '';
        }
        let isLandmarkRole = LANDMARK_ROLES.has(roleValue);
        if (!this.config.checkAllHTMLElements && !isLandmarkRole) {
          return;
        }
        let roleElementInfo = _ariaQuery.roleElements.get(roleValue);
        if (!roleElementInfo) {
          return;
        }
        const isRedundant = roleElementInfo.find(prop => prop.name === node.tag) && !allowedElementRoles.some(e => e.name === node.tag && e.role === roleValue);
        if (isRedundant) {
          if (this.mode === 'fix') {
            let roleAttrNode = _astNodeInfo.findAttribute(node, 'role');
            node.attributes = node.attributes.filter(attrNode => attrNode !== roleAttrNode);
          } else {
            let errorMessage = isLandmarkRole ? createErrorMessageLandmarkElement(node.tag, roleValue) : createErrorMessageAnyElement(node.tag, roleValue);
            this.log({
              message: errorMessage,
              node,
              isFixable: true
            });
          }
        }
      }
    };
  }
}
exports.default = NoRedundantRole;
function parseConfig(config) {
  if (config === true) {
    return DEFAULT_CONFIG;
  }
  if (config && typeof config === 'object') {
    return {
      checkAllHTMLElements: 'checkAllHTMLElements' in config ? config.checkAllHTMLElements : DEFAULT_CONFIG.checkAllHTMLElements
    };
  }
}