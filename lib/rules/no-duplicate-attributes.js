"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
function logDuplicateAttributes(node, attributes, identifier, type) {
  let currentAttribute;
  let currentIndex = 0;
  let length = attributes.length;
  for (const [index, attribute] of attributes.entries()) {
    for (currentIndex = index + 1; currentIndex < length; currentIndex++) {
      currentAttribute = attributes[currentIndex];
      if (attribute[identifier] === currentAttribute[identifier]) {
        if (this.mode === 'fix') {
          if (type === 'Element') {
            return node.attributes.splice(currentIndex, 1);
          } else {
            return node.hash.pairs.splice(currentIndex, 1);
          }
        } else {
          this.log({
            message: `Duplicate attribute '${currentAttribute[identifier]}' found in the ${type}.`,
            node: currentAttribute,
            isFixable: true,
            source: this.sourceForNode(node)
          });
          break;
        }
      }
    }
  }
}
class NoDuplicateAttributes extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        logDuplicateAttributes.call(this, node, node.attributes, 'name', 'Element');
      },
      GlimmerBlockStatement(node) {
        let attributes = (node.hash || {}).pairs || [];
        logDuplicateAttributes.call(this, node, attributes, 'key', 'GlimmerBlockStatement');
      },
      GlimmerMustacheStatement(node) {
        let attributes = (node.hash || {}).pairs || [];
        logDuplicateAttributes.call(this, node, attributes, 'key', 'GlimmerMustacheStatement');
      },
      GlimmerSubExpression(node) {
        let attributes = (node.hash || {}).pairs || [];
        logDuplicateAttributes.call(this, node, attributes, 'key', 'GlimmerSubExpression');
      }
    };
  }
}
exports.default = NoDuplicateAttributes;
module.exports = exports.default;