"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createErrorMessage(ancestorElement, role, descendantElement) {
  return `<${ancestorElement.tag}> has a role of ${role}, it cannot have semantic descendants like <${descendantElement.tag}>`;
}

/**
 * Gets all the element node descendants. If it is presentational we do not include it in the list
 * @param {object} node
 * @returns Array of element nodes
 */
function getAllElementNodeDescendants(node) {
  return _astNodeInfo.default.childrenFor(node).flatMap(childNode => {
    const isNotPresentationRole = _astNodeInfo.default.attributeTextValue(_astNodeInfo.default.findAttribute(childNode, 'role')) !== 'presentation';
    let descendants = [];
    if (_astNodeInfo.default.hasChildren(childNode)) {
      descendants = getAllElementNodeDescendants(childNode);
    }
    if (isNotPresentationRole && childNode.type === 'GlimmerElementNode') {
      return [childNode, ...descendants];
    }
    return [...descendants];
  });
}

// List of roles that cannot support semantic children
// https://w3c.github.io/aria-practices/#children_presentational
const ROLES_THAT_CANNOT_SUPPORT_SEMANTIC_CHILDREN = new Set(['button', 'checkbox', 'img', 'meter', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'radio', 'scrollbar', 'separator', 'slider', 'switch', 'tab']);
const NON_SEMANTIC_TAGS = new Set(['span', 'div', 'basefont', 'big', 'blink', 'center', 'font', 'marquee', 's', 'spacer', 'strike', 'tt', 'u']);
const SKIPPED_TAGS = new Set([
// SVG tags can contain a lot of special child tags
// Instead of marking all possible SVG child tags as `NON_SEMANTIG_TAG`,
// we skip checking this rule for presentational SVGs
'svg']);
class RequirePresentationalChildren extends _base.default {
  parseConfig(config) {
    return {
      additionalNonSemanticTags: config?.additionalNonSemanticTags ?? []
    };
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        const roleAttrValue = _astNodeInfo.default.attributeTextValue(_astNodeInfo.default.findAttribute(node, 'role'));

        // If role is not in list, we return
        if (!ROLES_THAT_CANNOT_SUPPORT_SEMANTIC_CHILDREN.has(roleAttrValue)) {
          return;
        }

        // If node tag is in list, we return
        if (SKIPPED_TAGS.has(node.tag)) {
          return;
        }
        const children = getAllElementNodeDescendants(node);
        for (const child of children) {
          // additional non semantic tags
          const {
            additionalNonSemanticTags
          } = this.config;
          const nonSemantic = new Set([...NON_SEMANTIC_TAGS, ...additionalNonSemanticTags]);
          // If it's not a non semantic tag, it's semantic
          if (!nonSemantic.has(child.tag)) {
            this.log({
              node: child,
              message: createErrorMessage(node, roleAttrValue, child)
            });
          }
        }
      }
    };
  }
}
exports.default = RequirePresentationalChildren;