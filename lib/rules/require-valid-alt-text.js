"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = _interopRequireDefault(require("../helpers/ast-node-info.js"));
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function hasAccessibleChild(node) {
  return _astNodeInfo.default.hasChildren(node);
}
const REDUNDANT_WORDS = ['image', 'photo', 'picture', 'logo', 'spacer'];
const ERROR_MESSAGE = 'Invalid alt attribute. Words such as `image`, `photo,` or `picture` are already announced by screen readers.';
class RequireValidAltText extends _base.default {
  logNode({
    node,
    message
  }) {
    return this.log({
      message,
      node
    });
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (_astNodeInfo.default.hasAttribute(node, 'hidden')) {
          return;
        }
        let hasAriaHiddenAttr = _astNodeInfo.default.hasAttribute(node, 'aria-hidden');
        if (hasAriaHiddenAttr) {
          let ariaHiddenAttr = _astNodeInfo.default.findAttribute(node, 'aria-hidden');
          if (ariaHiddenAttr.value.type === 'GlimmerTextNode' && ariaHiddenAttr.value.chars === 'true') {
            return;
          }
        }
        if (_astNodeInfo.default.hasAttribute(node, '...attributes')) {
          return;
        }
        const isImg = node.tag === 'img';
        const isObj = node.tag === 'object';
        const isInput = node.tag === 'input';
        const isArea = node.tag === 'area';
        if (isImg) {
          const hasAltAttribute = _astNodeInfo.default.hasAttribute(node, 'alt');
          let altAttribute, altValue;
          if (hasAltAttribute) {
            altAttribute = _astNodeInfo.default.findAttribute(node, 'alt');
            if (altAttribute.value.type === 'GlimmerTextNode') {
              altValue = altAttribute.value.chars;
            } else {
              altValue = altAttribute.value;
            }
          }
          const hasRole = _astNodeInfo.default.hasAttribute(node, 'role');
          let roleAttr, roleValue;
          if (hasRole) {
            roleAttr = _astNodeInfo.default.findAttribute(node, 'role');
            if (roleAttr.value.type === 'GlimmerTextNode') {
              roleValue = roleAttr.value.chars;
            } else {
              roleValue = roleAttr.value;
            }
          }
          let hasSrcAttr = _astNodeInfo.default.hasAttribute(node, 'src');
          let srcAttr, srcValue;
          if (hasSrcAttr) {
            srcAttr = _astNodeInfo.default.findAttribute(node, 'src');
            if (srcAttr.value.type === 'GlimmerTextNode') {
              srcValue = srcAttr.value.chars;
            } else {
              srcValue = srcAttr.value;
            }
          }

          // if the role value is a mustache statement we can not validate it
          if (hasAltAttribute && hasRole && !roleValue.type) {
            if (['none', 'presentation'].includes(roleValue.trim().toLowerCase()) && altValue !== '') {
              this.logNode({
                message: 'The `alt` attribute should be empty if `<img>` has `role` of `none` or `presentation`',
                node
              });
            }
          }
          if (!hasAltAttribute) {
            this.logNode({
              message: 'All `<img>` tags must have an alt attribute',
              node
            });
          } else if (altValue === srcValue) {
            this.logNode({
              message: 'The alt text must not be the same as the image source',
              node
            });
          } else {
            const altAttribute = _astNodeInfo.default.findAttribute(node, 'alt');
            if (altAttribute.value) {
              let normalizedAltValue = '';
              if (altAttribute.value.type === 'GlimmerTextNode') {
                normalizedAltValue = altAttribute.value.chars.trim().toLowerCase();
              } else if (altAttribute.value.type === 'GlimmerConcatStatement') {
                normalizedAltValue = altAttribute.value.parts.filter(part => part.type === 'GlimmerTextNode').map(part => part.chars).join(' ').trim().toLowerCase();
                if (normalizedAltValue === '') {
                  normalizedAltValue = null;
                }
              } else {
                normalizedAltValue = null;
              }
              if (normalizedAltValue === '') {
                if (['presentation', 'none'].includes(roleValue)) {
                  return;
                }
                this.logNode({
                  message: 'If the `alt` attribute is present and the value is an empty string, `role="presentation"` or `role="none"` must be present',
                  node
                });
                return;
              }
              if (normalizedAltValue !== null) {
                if (/^\d+$/g.test(normalizedAltValue)) {
                  this.logNode({
                    message: 'A number is not valid alt text',
                    node
                  });
                } else {
                  const normalizedAltValueWords = normalizedAltValue.split(' ');
                  const existingWords = REDUNDANT_WORDS.filter(word => normalizedAltValueWords.includes(word));
                  if (existingWords.length) {
                    this.logNode({
                      message: ERROR_MESSAGE,
                      node
                    });
                  }
                }
              }
            }
          }
        } else if (isInput) {
          const isImageInput = (0, _nodeMatcher.match)(node, {
            attributes: [{
              name: 'type',
              value: {
                type: 'GlimmerTextNode',
                chars: 'image'
              }
            }]
          });
          if (!isImageInput) {
            return;
          }
          const hasValidAttributes = _astNodeInfo.default.hasAnyAttribute(node, ['aria-label', 'aria-labelledby', 'alt']);
          if (!hasValidAttributes) {
            this.logNode({
              message: 'All <input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` attribute.',
              node
            });
          }
        } else if (isObj) {
          const hasRole = _astNodeInfo.default.hasAttribute(node, 'role');
          let roleAttr, roleValue;
          if (hasRole) {
            roleAttr = _astNodeInfo.default.findAttribute(node, 'role');
            if (roleAttr.value.type === 'GlimmerTextNode') {
              roleValue = roleAttr.value.chars;
            } else {
              roleValue = roleAttr.value;
            }
          }
          const hasValidAttributes = _astNodeInfo.default.hasAnyAttribute(node, ['aria-label', 'aria-labelledby', 'title']);
          if (hasValidAttributes || hasAccessibleChild(node) || ['presentation', 'none'].includes(roleValue)) {
            return;
          }
          this.logNode({
            message: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby attributes.',
            node
          });
        } else if (isArea) {
          if (!_astNodeInfo.default.hasAnyAttribute(node, ['aria-label', 'aria-labelledby', 'alt'])) {
            this.logNode({
              message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` attribute.',
              node
            });
          }
        }
      }
    };
  }
}
exports.default = RequireValidAltText;