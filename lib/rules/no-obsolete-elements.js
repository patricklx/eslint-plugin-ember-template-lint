"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MESSAGE_OBSOLETE_ELEMENT = ERROR_MESSAGE_OBSOLETE_ELEMENT;
exports.default = exports.OBSOLETE_ELEMENTS = void 0;
var _base = require("./_base.js");
function ERROR_MESSAGE_OBSOLETE_ELEMENT(element) {
  return `Use of <${element}> detected. Do not use deprecated elements.`;
}

// https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features
const OBSOLETE_ELEMENTS = ['acronym', 'applet', 'basefont', 'bgsound', 'big', 'blink', 'center', 'dir', 'font', 'frame', 'frameset', 'isindex', 'keygen', 'listing', 'marquee', 'menuitem', 'multicol', 'nextid', 'nobr', 'noembed', 'noframes', 'plaintext', 'rb', 'rtc', 'spacer', 'strike', 'tt', 'xmp'];
exports.OBSOLETE_ELEMENTS = OBSOLETE_ELEMENTS;
class NoObsoleteElements extends _base {
  visitor() {
    return {
      GlimmerElementNode(node) {
        if (!this.isLocal(node) && OBSOLETE_ELEMENTS.includes(node.tag)) {
          this.log({
            message: ERROR_MESSAGE_OBSOLETE_ELEMENT(node.tag),
            node
          });
        }
      }
    };
  }
}
exports.default = NoObsoleteElements;