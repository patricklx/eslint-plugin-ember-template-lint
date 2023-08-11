"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeMatcher = require("../helpers/node-matcher.js");
var _base = require("./_base.js");
const POINTER_DOWN_EVENTS = new Set(['mousedown', 'onmousedown', 'pointerdown', 'onpointerdown']);
const ERROR_MESSAGE = 'Avoid binding to a pointer `down` event; bind to a pointer `up` event instead';

/**
 * Detects that a Node is an instance of the `{{on}}` modifier with a known event that is being listened to
 *
 * @param {object} node
 * @return {boolean}
 */
function isOnModifier(node) {
  return (0, _nodeMatcher.match)(node, {
    path: {
      original: 'on'
    },
    params: [{
      type: 'GlimmerStringLiteral'
    }]
  });
}

/**
 * Detects that a Node is an instance of the `{{action}}` modifier
 *
 * @param {object} node
 * @return {boolean}
 */
function isActionModifier(node) {
  return (0, _nodeMatcher.match)(node, {
    path: {
      original: 'action'
    }
  });
}

/**
 * Check if an event name is a pointer "down" event
 *
 * @param {string} eventName
 * @return {boolean}
 */
function isPointerDownEvent(eventName) {
  return POINTER_DOWN_EVENTS.has(eventName.toLowerCase());
}
class NoPointerDownEventBinding extends _base {
  visitor() {
    return {
      GlimmerAttrNode(node) {
        if (node.name.startsWith('on') && isPointerDownEvent(node.name)) {
          this.log({
            message: ERROR_MESSAGE,
            node
          });
        }
      },
      GlimmerElementModifierStatement(node) {
        if (isOnModifier(node)) {
          const eventNameNode = node.params[0];
          if (isPointerDownEvent(eventNameNode.value)) {
            this.log({
              message: ERROR_MESSAGE,
              node: eventNameNode
            });
          }
        }
        if (isActionModifier(node)) {
          const onHashPair = node.hash.pairs.find(hashPairNode => (0, _nodeMatcher.match)(hashPairNode, {
            key: 'on'
          }));
          if (onHashPair && isPointerDownEvent(onHashPair.value.value)) {
            this.log({
              message: ERROR_MESSAGE,
              node: onHashPair.value
            });
          }
        }
      }
    };
  }
}
exports.default = NoPointerDownEventBinding;
module.exports = exports.default;