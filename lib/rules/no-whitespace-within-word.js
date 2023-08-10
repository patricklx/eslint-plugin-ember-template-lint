"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'Excess whitespace in layout detected.';
const WHITESPACE_ENTITY_LIST = ['&#32;', '&#160;', '&nbsp;', '&NonBreakingSpace;', '&#8194;', '&ensp;', '&#8195;', '&emsp;', '&#8196;', '&emsp13;', '&#8197;', '&emsp14;', '&#8199;', '&numsp;', '&#8200;', '&puncsp;', '&#8201;', '&thinsp;', '&ThinSpace;', '&#8202;', '&hairsp;', '&VeryThinSpace;', '&ThickSpace;', '&#8203;', '&ZeroWidthSpace;', '&NegativeVeryThinSpace;', '&NegativeThinSpace;', '&NegativeMediumSpace;', '&NegativeThickSpace;', '&#8204;', '&zwnj;', '&#8205;', '&zwj;', '&#8206;', '&lrm;', '&#8207;', '&rlm;', '&#8287;', '&MediumSpace;', '&ThickSpace;', '&#8288;', '&NoBreak;', '&#8289;', '&ApplyFunction;', '&af;', '&#8290;', '&InvisibleTimes;', '&it;', '&#8291;', '&InvisibleComma;', '&ic;'];
const CHARACTER_REGEX = '[a-zA-Z]';

// The goal here is to catch alternating non-whitespace/whitespace
// characters, for example, in 'W e l c o m e'.
//
// So the final pattern boils down to this:
//
// (whitespace)(non-whitespace)(whitespace)(non-whitespace)(whitespace)
//
// Specifically using this "5 alternations" rule since any less than this
// will return false positives and any more than this should not be
// necessary in 99.99% of cases
class NoWhitespaceWithinWord extends _base.default {
  constructor(...args) {
    super(...args);
    let whitespaceOrEntityRegex = `(?:\\s|${WHITESPACE_ENTITY_LIST.map(entity => `\\${entity}`).join('|')})+`;
    let characterRegex = CHARACTER_REGEX;
    this.regex = new RegExp(`${whitespaceOrEntityRegex}${characterRegex}${whitespaceOrEntityRegex}${characterRegex}${whitespaceOrEntityRegex}`);
  }
  visitor() {
    return {
      GlimmerTextNode(node, path) {
        let parents = [...path.parents()];
        if (parents.some(parent => parent.node.type === 'GlimmerAttrNode') || parents.some(parent => parent.node.type === 'GlimmerElementNode' && parent.node.tag === 'style')) {
          return;
        }
        let source = this.sourceForNode(node);
        if (this.regex.test(source)) {
          this.log({
            message: ERROR_MESSAGE,
            node,
            source
          });
        }
      }
    };
  }
}
exports.default = NoWhitespaceWithinWord;