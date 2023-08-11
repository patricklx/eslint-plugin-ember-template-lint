"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
function hasInvalidLinkTitle(node, titleAttributeValues) {
  // Extract the text content(s) from the GlimmerTextNode child(ren)
  const nodeChildren = _astNodeInfo.childrenFor(node);
  const textChildren = nodeChildren.filter(child => child.type === 'GlimmerTextNode');
  const linkTexts = textChildren.map(linkText => linkText.chars.toLowerCase().trim()).filter(text => text.length > 0);

  // Check to see if the text content includes the title attribute value
  const linkTextIncludesTitle = linkTexts.some(linkText => titleAttributeValues.some(title => linkText.includes(title)));
  return linkTextIncludesTitle;
}
class NoInvalidLinkTitle extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.tag === 'a' || node.tag === 'LinkTo') {
          let hasTitleAttr = _astNodeInfo.hasAttribute(node, 'title');
          let titleAttr, titleAttrValue;
          if (hasTitleAttr) {
            titleAttr = _astNodeInfo.findAttribute(node, 'title');
            if (titleAttr.value.type === 'GlimmerTextNode') {
              titleAttrValue = titleAttr.value.chars;
            } else {
              titleAttrValue = titleAttr.value;
            }
          }
          let hasTitleArg = _astNodeInfo.hasAttribute(node, '@title');
          let titleArg, titleArgValue;
          if (hasTitleArg) {
            titleArg = _astNodeInfo.findAttribute(node, '@title');
            if (titleArg.value.type === 'GlimmerTextNode') {
              titleArgValue = titleArg.value.chars;
            } else {
              titleArgValue = titleArg.value;
            }
          }
          let titleValues = [titleAttrValue, node.tag === 'LinkTo' && titleArgValue].filter(possibleValue => typeof possibleValue === 'string').map(value => value.toLowerCase().trim());
          if (titleValues.length > 1) {
            this.log({
              message: 'Specifying title as both an attribute and an argument to <LinkTo /> is invalid.',
              node
            });
          }
          if (hasInvalidLinkTitle(node, titleValues)) {
            this.log({
              message: 'Title attribute values should not be the same as or part of the link text.',
              node
            });
          }
        }
      },
      GlimmerBlockStatement(node) {
        if (node.path.original === 'link-to') {
          let titleHashArg = node.hash.pairs.find(pair => pair.key === 'title');
          if (titleHashArg && titleHashArg.value.type === 'GlimmerStringLiteral') {
            let titleValue = titleHashArg.value.value.toLowerCase().trim();
            if (hasInvalidLinkTitle(node, [titleValue])) {
              this.log({
                message: 'Title attribute values should not be the same as or part of the link text.',
                node
              });
            }
          }
        }
      }
    };
  }
}
exports.default = NoInvalidLinkTitle;
module.exports = exports.default;