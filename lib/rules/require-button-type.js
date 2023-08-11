"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emberTemplateRecast = require("ember-template-recast");
var _hasParentTag = require("../helpers/has-parent-tag.js");
var _base = require("./_base.js");
const ERROR_MESSAGE = 'All `<button>` elements should have a valid `type` attribute';
class RequireButtonType extends _base {
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
            if (_hasParentTag(path, 'form')) {
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
module.exports = exports.default;