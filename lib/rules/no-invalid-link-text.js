"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEFAULT_CONFIG = {
  allowEmptyLinks: false
};
const DISALLOWED_LINK_TEXT = new Set([
// WCAG F84-Provided Examples
'click here', 'more info', 'read more', 'more']);
function getTrimmedText(text) {
  const nbspRemoved = text.replace(/&nbsp;/g, ' ');
  return nbspRemoved.toLowerCase().trim();
}
function isHidden(element) {
  const ariaHiddenAttr = _astNodeInfo.default.findAttribute(element, 'aria-hidden');
  return ariaHiddenAttr && ariaHiddenAttr.value.chars === 'true' || _astNodeInfo.default.hasAttribute(element, 'hidden');
}
function hasValidAriaLabel(node) {
  const ariaLabelledbyAttr = _astNodeInfo.default.findAttribute(node, 'aria-labelledby');
  if (ariaLabelledbyAttr) {
    let ariaLabelledby = getTrimmedText(ariaLabelledbyAttr.value.chars);
    return ariaLabelledby.length > 0;
  }
  const ariaLabelAttr = _astNodeInfo.default.findAttribute(node, 'aria-label');
  if (ariaLabelAttr) {
    if (ariaLabelAttr.value?.type === 'GlimmerMustacheStatement') {
      // We can't evaluate MustacheStatements so we assume this is valid
      return true;
    }
    let ariaLabel = getTrimmedText(ariaLabelAttr.value.chars);
    return !DISALLOWED_LINK_TEXT.has(ariaLabel);
  }
}
function hasInvalidLinkText(node, allowEmptyLinks) {
  // Extract the text content(s) from the GlimmerTextNode child(ren)
  const nodeChildren = _astNodeInfo.default.childrenFor(node);
  const textChildren = nodeChildren.filter(child => child.type === 'GlimmerTextNode');
  let linkTexts;
  if (nodeChildren.length !== textChildren.length) {
    // do not flag an error when the link contains additional dynamic (non-text) children
    return;
  }
  if (allowEmptyLinks) {
    linkTexts = textChildren.map(linkText => linkText['chars'].toLowerCase().trim());
  } else {
    if (isHidden(node) || hasValidAriaLabel(node)) {
      return;
    }
    if (!nodeChildren.length) {
      return true;
    }
    linkTexts = textChildren.map(linkText => getTrimmedText(linkText.chars));
    DISALLOWED_LINK_TEXT.add('');
  }

  // Check to see if the text content is too `generic` by checking it against
  // the reference list (array, above) of `disallowed` link text Strings/phrases
  const hasGenericLinkTexts = linkTexts.some(linkText => DISALLOWED_LINK_TEXT.has(linkText));
  return hasGenericLinkTexts;
}
class NoInvalidLinkText extends _base.default {
  parseConfig(config) {
    let configType = typeof config;
    switch (configType) {
      case 'boolean':
        {
          return config ? DEFAULT_CONFIG : false;
        }
      case 'object':
        {
          return {
            allowEmptyLinks: config.allowEmptyLinks
          };
        }
      case 'undefined':
        {
          return false;
        }
    }
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.tag === 'a' || node.tag === 'LinkTo') {
          // Report if one or more child GlimmerTextNode element(s) is on the disallowed list
          if (hasInvalidLinkText(node, this.config.allowEmptyLinks)) {
            this.log({
              message: 'Links should have descriptive text',
              node
            });
          }
        }
      },
      GlimmerBlockStatement(node) {
        if (node.path.original === 'link-to') {
          // Report if one or more child GlimmerTextNode element(s) is on the disallowed list
          if (hasInvalidLinkText(node, this.config.allowEmptyLinks)) {
            this.log({
              message: 'Links should have descriptive text',
              node
            });
          }
        }
      }
    };
  }
}
exports.default = NoInvalidLinkText;