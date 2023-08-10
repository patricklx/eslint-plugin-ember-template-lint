"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Media elements such as <audio> and <video> must have a <track> for captions.';
const mediaTypes = new Set(['audio', 'video']);
function hasTrackWithCaptions(nodes) {
  for (let node of nodes) {
    if (node.tag === 'track') {
      let kindAttribute = _astNodeInfo.default.findAttribute(node, 'kind');
      if (kindAttribute && kindAttribute.value.chars === 'captions') {
        return true;
      }
    }
  }
}
class RequireMediaCaption extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (!mediaTypes.has(node.tag)) {
          return;
        }
        const mutedAttribute = _astNodeInfo.default.findAttribute(node, 'muted');
        if (mutedAttribute) {
          if (['GlimmerMustacheStatement', 'GlimmerBlockStatement'].includes(mutedAttribute.value.type) || ![false, 'false'].includes(mutedAttribute.value.chars)) {
            return;
          }
        }
        if (!_astNodeInfo.default.hasChildren(node) || !hasTrackWithCaptions(_astNodeInfo.default.childrenFor(node))) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = RequireMediaCaption;