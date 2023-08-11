"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./_base.js");
const ERROR_MESSAGE = 'Overriding `tagName` on `LinkTo` components is not allowed';
class NoLinkToTagname extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        this.processAngleBracket(node);
      },
      GlimmerBlockStatement(node) {
        this.processCurly(node);
      },
      GlimmerMustacheStatement(node) {
        this.processCurly(node);
      }
    };
  }
  processAngleBracket(node) {
    let {
      attributes,
      tag
    } = node;
    if (tag !== 'LinkTo') {
      return;
    }
    let tagNameAttr = attributes.find(it => it.name === '@tagName');
    if (tagNameAttr) {
      this.log({
        message: ERROR_MESSAGE,
        node: tagNameAttr
      });
    }
  }
  processCurly(node) {
    let {
      hash,
      path
    } = node;
    if (path.type !== 'GlimmerPathExpression' || path.original !== 'link-to') {
      return;
    }
    let tagNameHashPair = hash.pairs.find(it => it.key === 'tagName');
    if (tagNameHashPair) {
      this.log({
        message: ERROR_MESSAGE,
        node: tagNameHashPair
      });
    }
  }
}
exports.default = NoLinkToTagname;
module.exports = exports.default;