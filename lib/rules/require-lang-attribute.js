"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.parseConfig = parseConfig;
var _languageTags = require("language-tags");
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const DEFAULT_CONFIG = {
  validateValues: true
};
const ERROR_MESSAGE = 'The `<html>` element must have the `lang` attribute with a valid value';
function hasValue(langAttrNode) {
  let langAttributeValue;
  if (langAttrNode.value.type === 'GlimmerTextNode') {
    langAttributeValue = langAttrNode.value.chars;
  } else {
    langAttributeValue = langAttrNode.value;
  }
  return langAttributeValue;
}
function hasValidValue(langAttrNode) {
  if (langAttrNode.value.type === 'GlimmerTextNode') {
    return _languageTags.check(langAttrNode.value.chars);
  } else {
    return langAttrNode.value !== undefined;
  }
}
class RequireLangAttribute extends _base {
  parseConfig(config) {
    return parseConfig(config);
  }
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (node.tag === 'html' && !_astNodeInfo.hasAttribute(node, 'lang')) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
        const hasLangAttribute = _astNodeInfo.hasAttribute(node, 'lang');
        let langAttrNode;
        if (hasLangAttribute) {
          langAttrNode = _astNodeInfo.findAttribute(node, 'lang');
        }
        if (node.tag === 'html' && hasLangAttribute) {
          let isValidValue = this.config.validateValues ? hasValidValue(langAttrNode) : hasValue(langAttrNode);
          if (!isValidValue) {
            this.log({
              message: ERROR_MESSAGE,
              node
            });
          }
        }
      }
    };
  }
}
exports.default = RequireLangAttribute;
function parseConfig(config) {
  if (config === true) {
    return DEFAULT_CONFIG;
  }
  if (config && typeof config === 'object') {
    return {
      validateValues: 'validateValues' in config ? config.validateValues : DEFAULT_CONFIG.validateValues
    };
  }
}