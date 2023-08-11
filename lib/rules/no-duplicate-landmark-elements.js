"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.';

// from https://www.w3.org/WAI/PF/aria/roles#landmark_roles
const LANDMARK_ROLES = new Set(['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search']);
const DEFAULT_ROLE_FOR_ELEMENT = new Map([['header', 'banner'], ['main', 'main'], ['aside', 'complementary'], ['form', 'form'], ['nav', 'navigation'], ['footer', 'contentinfo']]);
class NoDuplicateLandmarkElements extends _base {
  constructor(options) {
    super(options);
    this._landmarksSeen = new Map();
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        const roleAttribute = _astNodeInfo.findAttribute(node, 'role');
        if (roleAttribute && !(0, _nodeMatcher.match)(roleAttribute, {
          value: {
            type: 'GlimmerTextNode'
          }
        })) {
          // dynamic role value; nothing we can infer/do about it
          return;
        }
        if (!roleAttribute && !DEFAULT_ROLE_FOR_ELEMENT.has(node.tag)) {
          // no role override, and not a landmark element
          return;
        }
        const role = roleAttribute ? roleAttribute.value.chars : DEFAULT_ROLE_FOR_ELEMENT.get(node.tag);
        const isLandmarkRole = LANDMARK_ROLES.has(role);
        if (!isLandmarkRole) {
          return;
        }

        // check for accessible label via aria-label or aria-labelledby
        const labelAttribute = _astNodeInfo.findAttribute(node, 'aria-label') || _astNodeInfo.findAttribute(node, 'aria-labelledby');
        if (labelAttribute && !(0, _nodeMatcher.match)(labelAttribute, {
          value: {
            type: 'GlimmerTextNode'
          }
        })) {
          // can't make inference about dynamic label
          return;
        }
        const label = labelAttribute ? labelAttribute.value.chars : undefined;
        let labelsForRole = this._landmarksSeen.get(role);
        if (labelsForRole === undefined) {
          labelsForRole = new Map();
          this._landmarksSeen.set(role, labelsForRole);
        }
        let hasUnlabeledForRole = labelsForRole.has(undefined);
        if (hasUnlabeledForRole || labelsForRole.has(label)) {
          let problematicNode = hasUnlabeledForRole && label !== undefined ? labelsForRole.get(undefined) : node;
          this.log({
            message: ERROR_MESSAGE,
            node: problematicNode
          });
        }
        labelsForRole.set(label, node);
      }
    };
  }
}
exports.default = NoDuplicateLandmarkElements;
module.exports = exports.default;