"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Buttons should not contain heading elements';
const HEADING_ELEMENTS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
function hasButtonParent(path) {
  let parents = [...path.parents()];
  let refButtonNodes = [
  // <button></button>
  {
    type: 'GlimmerElementNode',
    tag: 'button'
  },
  // <div role="button"></div>
  {
    type: 'GlimmerElementNode',
    attributes: [{
      type: 'GlimmerAttrNode',
      name: 'role',
      value: {
        type: 'GlimmerTextNode',
        chars: 'button'
      }
    }]
  }];
  let hasButtonParent = parents.find(parent => (0, _nodeMatcher.match)(parent.node, refButtonNodes));
  if (hasButtonParent) {
    return true;
  }
  return false;
}
class NoHeadingInsideButton extends _base.default {
  visitor() {
    return {
      GlimmerElementNode(node, path) {
        // Only heading elements: check rule conditions
        if (!HEADING_ELEMENTS.has(node.tag)) {
          return;
        }

        // if it's a heading, check to see if one of the parent elements is a button
        if (hasButtonParent(path)) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      }
    };
  }
}
exports.default = NoHeadingInsideButton;