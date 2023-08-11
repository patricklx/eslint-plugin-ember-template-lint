"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-scope-outside-table-headings',
  config: true,
  good: ['<th scope="row">Some table heading></th>', `
    <table>
      <th scope="col">Table header</th>
      <td>Some data</td>
    </table>
    `, '<CustomComponent scope />', '<CustomComponent scope="row" />', '<CustomComponent scope={{foo}} />', '{{foo-component scope="row"}}'],
  bad: [{
    template: '<td scope="row"></td>',
    result: {
      message: 'The scope attribute should only be set on <th> elements',
      line: 1,
      column: 0,
      source: '<td scope="row"></td>'
    }
  }, {
    template: '<td scope></td>',
    result: {
      message: 'The scope attribute should only be set on <th> elements',
      line: 1,
      column: 0,
      source: '<td scope></td>'
    }
  }, {
    template: '<a scope="row" />',
    result: {
      message: 'The scope attribute should only be set on <th> elements',
      line: 1,
      column: 0,
      source: '<a scope="row" />'
    }
  }, {
    template: `
<table>
<th>Some header</th>
<td scope="col">Some data</td>
</table>
`,
    result: {
      message: 'The scope attribute should only be set on <th> elements',
      line: 4,
      column: 0,
      source: '<td scope="col">Some data</td>'
    }
  }]
});