"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-unnecessary-curly-strings',
  config: true,
  good: ['<FooBar class="btn" />', '{{foo}}', '{{(foo)}}', '{{this.calculate 1 2 op="add"}}', '{{get address part}}', 'foo', '"foo"', '<FooBar value=12345 />', '<FooBar value=null />', '<FooBar value=true />', '<FooBar value=undefined />', '<FooBar value={{12345}} />', '<FooBar value={{null}} />', '<FooBar value={{true}} />', '<FooBar value={{undefined}} />'],
  bad: [{
    template: '<FooBar class={{"btn"}} @fooArg={{\'barbaz\'}} />',
    fixedTemplate: '<FooBar class="btn" @fooArg=\'barbaz\' />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 23,
              "endLine": 1,
              "filePath": "layout.hbs",
              "isFixable": true,
              "line": 1,
              "message": "Unnecessary curly braces around string",
              "rule": "no-unnecessary-curly-strings",
              "severity": 2,
              "source": "{{\\"btn\\"}}",
            },
            {
              "column": 32,
              "endColumn": 44,
              "endLine": 1,
              "filePath": "layout.hbs",
              "isFixable": true,
              "line": 1,
              "message": "Unnecessary curly braces around string",
              "rule": "no-unnecessary-curly-strings",
              "severity": 2,
              "source": "{{'barbaz'}}",
            },
          ]
        `);
    }
  }, {
    template: '<FooBar class="btn">{{"Foo"}}</FooBar>',
    fixedTemplate: '<FooBar class="btn">Foo</FooBar>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 29,
              "endLine": 1,
              "filePath": "layout.hbs",
              "isFixable": true,
              "line": 1,
              "message": "Unnecessary curly braces around string",
              "rule": "no-unnecessary-curly-strings",
              "severity": 2,
              "source": "{{\\"Foo\\"}}",
            },
          ]
        `);
    }
  }]
});