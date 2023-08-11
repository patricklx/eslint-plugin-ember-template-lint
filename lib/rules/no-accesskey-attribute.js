"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const errorMessage = 'No access key attribute allowed. Inconsistencies between keyboard shortcuts and keyboard comments used by screenreader and keyboard only users create a11y complications.';
class NoAccesskeyAttribute extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        const accessKeyNode = _astNodeInfo.findAttribute(node, 'accesskey');
        if (accessKeyNode) {
          if (this.mode === 'fix') {
            node.attributes = node.attributes.filter(a => a !== accessKeyNode);
          } else {
            this.log({
              message: errorMessage,
              isFixable: true,
              node: accessKeyNode
            });
          }
        }
      }
    };
  }
}
exports.default = NoAccesskeyAttribute;
module.exports = exports.default;