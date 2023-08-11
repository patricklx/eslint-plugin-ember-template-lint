"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-shadowed-elements',
  config: true,
  good: ['{{#foo-bar as |Baz|}}<Baz />{{/foo-bar}}', '<FooBar as |Baz|><Baz /></FooBar>', '{{#with foo=(component "blah-zorz") as |Div|}}<Div></Div>{{/with}}', '<Foo as |bar|><bar.baz /></Foo>'],
  bad: [{
    template: '<FooBar as |div|><div></div></FooBar>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 28,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Ambiguous element used (\`div\`)",
              "rule": "no-shadowed-elements",
              "severity": 2,
              "source": "<div></div>",
            },
          ]
        `);
    }
  }]
});