"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Media elements such as <audio> and <video> must have a <track> for captions.';
const mediaTypes = new Set(['audio', 'video']);
function hasTrackWithCaptions(nodes) {
  for (let node of nodes) {
    if (node.tag === 'track') {
      let kindAttribute = _astNodeInfo.findAttribute(node, 'kind');
      if (kindAttribute && kindAttribute.value.chars === 'captions') {
        return true;
      }
    }
  }
}
class RequireMediaCaption extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (!mediaTypes.has(node.tag)) {
          return;
        }
        const mutedAttribute = _astNodeInfo.findAttribute(node, 'muted');
        if (mutedAttribute) {
          if (['GlimmerMustacheStatement', 'GlimmerBlockStatement'].includes(mutedAttribute.value.type) || ![false, 'false'].includes(mutedAttribute.value.chars)) {
            return;
          }
        }
        if (!_astNodeInfo.hasChildren(node) || !hasTrackWithCaptions(_astNodeInfo.childrenFor(node))) {
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
module.exports = exports.default;