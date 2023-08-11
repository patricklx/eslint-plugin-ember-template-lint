"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function isConfigurationHtmlComment(node) {
  return node.type === 'GlimmerCommentStatement' && node.value.trim().indexOf('template-lint ') === 0;
}
function isNonConfigurationHtmlComment(node) {
  return node.type === 'GlimmerCommentStatement' && node.value.trim().indexOf('template-lint ') !== 0;
}
function isIf(node) {
  return node.path && node.path.original === 'if';
}
function isUnless(node) {
  return node.path && node.path.original === 'unless';
}
function isEach(node) {
  return node.path && node.path.original === 'each';
}
function isEachIn(node) {
  return node.path && node.path.original === 'each-in';
}
function isLet(node) {
  return node.path && node.path.original === 'let';
}
function isWith(node) {
  return node.path && node.path.original === 'with';
}
function isControlFlowHelper(node) {
  return isIf(node) || isUnless(node) || isEach(node) || isEachIn(node) || isLet(node) || isWith(node);
}
function hasAttribute(node, attributeName) {
  let attribute = findAttribute(node, attributeName);
  return Boolean(attribute);
}
function hasAnyAttribute(node, attributeNames) {
  return attributeNames.map(name => hasAttribute(node, name)).includes(true);
}
function findAttribute(node, attributeName) {
  if (!node.attributes || !node.attributes.length) {
    return;
  }
  for (let i = 0; i < node.attributes.length; i++) {
    let attribute = node.attributes[i];
    if (attribute.name === attributeName) {
      return attribute;
    }
  }
}
function childrenFor(node) {
  if (node.type === 'GlimmerProgram' || node.type === 'GlimmerBlock' || node.type === 'GlimmerTemplate') {
    return node.body;
  }
  if (node.type === 'GlimmerBlockStatement') {
    if (node.inverse) {
      return [...node.program.body, ...node.inverse.body];
    }
    return node.program.body;
  }
  if (node.type === 'GlimmerElementNode') {
    return node.children;
  }
}
function hasChildren(node) {
  let children = childrenFor(node);
  return Boolean(children && children.length);
}
function attributeTextValue(node) {
  if (!node) {
    return;
  }
  if (node.value && node.value.type === 'GlimmerTextNode') {
    return node.value.chars;
  }
}
var _default = {
  attributeTextValue,
  childrenFor,
  findAttribute,
  hasAttribute,
  hasChildren,
  hasAnyAttribute,
  isIf,
  isUnless,
  isEach,
  isEachIn,
  isLet,
  isWith,
  isControlFlowHelper,
  isConfigurationHtmlComment,
  isNonConfigurationHtmlComment
};
exports.default = _default;
module.exports = exports.default;