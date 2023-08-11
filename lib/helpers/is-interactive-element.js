"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInteractiveElement;
exports.reason = reason;
var _astNodeInfo = require("./ast-node-info.js");
const INTERACTIVE_TAG_NAMES = new Set(['button', 'canvas', 'details', 'embed', 'iframe', 'input', 'keygen', 'label', 'select', 'textarea']);

// Spec: https://www.w3.org/TR/wai-aria/complete#widget_roles

const ARIA_WIDGET_ROLES = new Set(['button', 'checkbox', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'scrollbar', 'slider', 'spinbutton', 'tab', 'textbox', 'tooltip', 'treeitem']);
function isAudioVideoWithControls(node) {
  return (node.tag === 'audio' || node.tag === 'video') && _astNodeInfo.hasAttribute(node, 'controls');
}
function isHyperLink(node) {
  return node.tag === 'a' && _astNodeInfo.hasAttribute(node, 'href');
}
function isHiddenInput(node) {
  if (node.tag !== 'input') {
    return false;
  }
  let type = _astNodeInfo.findAttribute(node, 'type');
  if (type && type.value && type.value.chars === 'hidden') {
    return true;
  }
  return false;
}
function getInteractiveAriaRole(node) {
  let role = _astNodeInfo.findAttribute(node, 'role');
  if (role && role.value && ARIA_WIDGET_ROLES.has(role.value.chars)) {
    return `role="${role.value.chars}"`;
  }
  return false;
}

/*
 Spec: https://html.spec.whatwg.org/multipage/dom.html#interactive-content-2

 `<label>` was omitted due to the ability nesting a label with an input tag.
 `<audio>` and `<video>` also omitted because use legacy browser support
 there is a need to use it nested with `<object>` and `<a>`
 */
function reason(node) {
  if (isAudioVideoWithControls(node)) {
    return `an <${node.tag}> element with the \`controls\` attribute`;
  }
  if (node.type !== 'GlimmerElementNode' && node.type !== 'ComponentNode') {
    return null;
  }
  if (isHiddenInput(node)) {
    return null;
  }
  if (INTERACTIVE_TAG_NAMES.has(node.tag)) {
    return `<${node.tag}>`;
  }
  let role = getInteractiveAriaRole(node);
  if (role) {
    return `an element with \`${role}\``;
  }
  if (isHyperLink(node)) {
    return 'an <a> element with the `href` attribute';
  }
  if (_astNodeInfo.hasAttribute(node, 'tabindex')) {
    return 'an element with the `tabindex` attribute';
  }
  if ((node.tag === 'img' || node.tag === 'object') && _astNodeInfo.hasAttribute(node, 'usemap')) {
    return `an <${node.tag}> element with the \`usemap\` attribute`;
  }
  return null;
}
function isInteractiveElement(node) {
  return reason(node) !== null;
}