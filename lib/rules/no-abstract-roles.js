"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// From https://www.w3.org/TR/wai-aria-1.0/roles#abstract_roles
const PROHIBITED_ROLE_VALUES = new Set(['command', 'composite', 'input', 'landmark', 'range', 'roletype', 'section', 'sectionhead', 'select', 'structure', 'widget', 'window']);
class NoAbstractRoles extends _base.default {
  logNode({
    node,
    message
  }) {
    return this.log({
      message,
      node
    });
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        const roleAttr = _astNodeInfo.default.findAttribute(node, 'role');
        if (roleAttr) {
          const roleAttrValue = _astNodeInfo.default.attributeTextValue(roleAttr);
          if (PROHIBITED_ROLE_VALUES.has(roleAttrValue)) {
            this.logNode({
              message: `${roleAttrValue} is an abstract role, and is not a valid value for the role attribute.`,
              node
            });
          }
        }
      }
    };
  }
}
exports.default = NoAbstractRoles;