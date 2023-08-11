"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ariaQuery = require("aria-query");
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
function createRequiredAttributeErrorMessage(attrs, role) {
  if (attrs.length < 2) {
    return `The attribute ${attrs[0]} is required by the role ${role}`;
  } else {
    return `The attributes ${attrs.join(', ')} are required by the role ${role}`;
  }
}
class requireMandatoryRoleAttributes extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        let role;
        if (_astNodeInfo.hasAttribute(node, 'role')) {
          let roleAttrNode = _astNodeInfo.findAttribute(node, 'role');
          if (roleAttrNode.value.type === 'GlimmerTextNode') {
            role = roleAttrNode.value.chars || undefined;
          }
        }

        // Skip validation if role is unknown
        if (!role) {
          return;
        }
        const roleDefinition = _ariaQuery.roles.get(role);
        if (roleDefinition === undefined) {
          return;
        }

        // Get a list of the ARIA attributes defined for this element
        let foundAriaAttributes = [];
        for (const attribute of node.attributes) {
          if (attribute.name.startsWith('aria-')) {
            foundAriaAttributes.push(attribute);
          }
        }

        // Check that all required attributes for this role are present
        const requiredAttributes = Object.keys(roleDefinition.requiredProps);
        for (let requiredAttribute of requiredAttributes) {
          let hasRequiredAttribute = foundAriaAttributes.some(attr => attr.name === requiredAttribute);
          if (!hasRequiredAttribute) {
            this.log({
              message: createRequiredAttributeErrorMessage(requiredAttributes, role),
              node
            });
          }
        }
      },
      GlimmerMustacheStatement(node) {
        const roleAttribute = node.hash.pairs.find(pair => pair.key === 'role');
        if (!roleAttribute) {
          return;
        }
        if (!roleAttribute.value.type === 'GlimmerStringLiteral') {
          return;
        }
        let role = roleAttribute.value.original;

        // Skip validation if role is unknown
        if (!role) {
          return;
        }
        const roleDefinition = _ariaQuery.roles.get(role);
        if (!roleDefinition) {
          return;
        }

        // Get a list of the ARIA attributes defined for this element
        let foundAriaAttributes = [];
        for (const pair of node.hash.pairs) {
          if (pair.key.startsWith('aria-')) {
            foundAriaAttributes.push(pair);
          }
        }

        // Check that all required attributes for this role are present
        const requiredAttributes = Object.keys(roleDefinition.requiredProps);
        for (let requiredAttribute of requiredAttributes) {
          let hasRequiredAttribute = foundAriaAttributes.some(attr => attr.key === requiredAttribute);
          if (!hasRequiredAttribute) {
            this.log({
              message: createRequiredAttributeErrorMessage(requiredAttributes, role),
              node
            });
          }
        }
      }
    };
  }
}
exports.default = requireMandatoryRoleAttributes;
module.exports = exports.default;