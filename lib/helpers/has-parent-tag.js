"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasParentTag;
var _nodeMatcher = require("./node-matcher.js");
function hasParentTag(path, tag) {
  let parents = [...path.parents()];
  let refParentNode = {
    tag,
    type: 'GlimmerElementNode'
  };
  let hasHeadElementInParentPath = parents.some(parent => (0, _nodeMatcher.match)(parent.node, refParentNode));
  return Boolean(hasHeadElementInParentPath);
}
module.exports = exports.default;