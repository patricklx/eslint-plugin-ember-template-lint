"use strict";

var _noObsoleteElements = require("../../../lib/rules/no-obsolete-elements.js");
var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-obsolete-elements',
  config: true,
  good: ['<div></div>', `{{#let (component 'whatever-here') as |plaintext|}}
      <plaintext />
    {{/let}}`],
  bad: _noObsoleteElements.OBSOLETE_ELEMENTS.map(element => {
    const VOID_ELEMENTS = ['keygen'];
    const html = VOID_ELEMENTS.includes(element) ? `<${element}>` : `<${element}></${element}>`;
    return {
      template: html,
      result: {
        message: (0, _noObsoleteElements.ERROR_MESSAGE_OBSOLETE_ELEMENT)(element),
        source: html,
        line: 1,
        column: 0,
        endLine: 1,
        endColumn: html.length
      }
    };
  })
});