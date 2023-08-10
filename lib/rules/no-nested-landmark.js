"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createErrorMessage(element) {
  return `Nested landmark elements on <${element}> detected. Landmark elements should not be nested within landmark elements of the same name.`;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#html-sectioning-elements
const LANDMARK_ELEMENTS = new Set(['header', 'main', 'aside', 'form', 'main', 'nav', 'footer']);

// https://www.w3.org/TR/wai-aria-1.1/#landmark_roles
const ROLES = new Set(['banner', 'main', 'complementary', 'form', 'search', 'navigation', 'contentinfo']);
const EQUIVALENT_ROLE = {
  aside: 'complementary',
  footer: 'contentinfo',
  header: 'banner',
  main: 'main',
  nav: 'navigation',
  section: 'region'
};
class NoNestedLandmark extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node, path) {
        if (this.isLandmarkElement(node)) {
          for (let parent of path.parents()) {
            if (this.isLandmarkElement(parent.node) && this.getLandmarkType(parent.node) === this.getLandmarkType(node)) {
              this.log({
                message: createErrorMessage(node.tag),
                node
              });
            }
          }
        }
      }
    };
  }
  getLandmarkType(node) {
    let hasRoleAttr = _astNodeInfo.default.hasAttribute(node, 'role');
    let roleAttr, roleValue;
    if (hasRoleAttr) {
      roleAttr = _astNodeInfo.default.findAttribute(node, 'role');
      if (roleAttr.value.type === 'GlimmerTextNode') {
        roleValue = roleAttr.value.chars;
      } else {
        roleValue = roleAttr.value;
      }
    }
    const equivalentRole = EQUIVALENT_ROLE[node.tag];
    return roleValue || equivalentRole || node.tag;
  }
  isLandmarkElement(node) {
    let hasRoleAttr = _astNodeInfo.default.hasAttribute(node, 'role');
    let roleAttr, roleValue;
    if (hasRoleAttr) {
      roleAttr = _astNodeInfo.default.findAttribute(node, 'role');
      if (roleAttr.value.type === 'GlimmerTextNode') {
        roleValue = roleAttr.value.chars;
      } else {
        roleValue = roleAttr.value;
      }
    }
    return LANDMARK_ELEMENTS.has(node.tag) || ROLES.has(roleValue);
  }
}
exports.default = NoNestedLandmark;