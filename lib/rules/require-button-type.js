"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _hasParentTag = _interopRequireDefault(require("../helpers/has-parent-tag.js"));
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ERROR_MESSAGE = 'All `<button>` elements should have a valid `type` attribute';
class RequireButtonType extends _base.default {
  logNode({
    node,
    message
  }) {
    return this.log({
      message,
      node,
      isFixable: true
    });
  }
  visitor() {
    return {
      GlimmerElementNode(node, path) {
        let {
          tag,
          attributes
        } = node;
        if (tag !== 'button') {
          return;
        }
        let typeAttribute = attributes.find(it => it.name === 'type');
        if (!typeAttribute) {
          if (this.mode === 'fix') {
            if ((0, _hasParentTag.default)(path, 'form')) {
              attributes.push(_emberTemplateRecast.builders.attr('type', _emberTemplateRecast.builders.text('submit')));
            } else {
              attributes.push(_emberTemplateRecast.builders.attr('type', _emberTemplateRecast.builders.text('button')));
            }
          } else {
            this.logNode({
              node,
              message: ERROR_MESSAGE
            });
          }
          return;
        }
        let {
          value
        } = typeAttribute;
        if (value.type !== 'GlimmerTextNode') {
          return;
        }
        let {
          chars
        } = value;
        if (!['button', 'submit', 'reset'].includes(chars)) {
          if (this.mode === 'fix') {
            let index = attributes.indexOf(typeAttribute);
            attributes[index] = _emberTemplateRecast.builders.attr('type', _emberTemplateRecast.builders.text('button'));
          } else {
            this.logNode({
              node,
              message: ERROR_MESSAGE
            });
          }
        }
      }
    };
  }
}
exports.default = RequireButtonType;