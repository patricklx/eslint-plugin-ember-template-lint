"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-link-to-tagname",
  config: true,
  good: ['<Foo @route="routeName" @tagName="button">Link text</Foo>', '<LinkTo @route="routeName">Link text</LinkTo>', '{{#link-to "routeName"}}Link text{{/link-to}}', '{{#foo "routeName" tagName="button"}}Link text{{/foo}}', '{{link-to "Link text" "routeName"}}', '{{foo "Link text" "routeName" tagName="button"}}'],
  bad: [{
    template: '<LinkTo @route="routeName" @tagName="button">Link text</LinkTo>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 28,
              "endColumn": 45,
              "endLine": 1,
              "line": 1,
              "message": "Overriding \`tagName\` on \`LinkTo\` components is not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-tagname",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#link-to "routeName" tagName="button"}}Link text{{/link-to}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 24,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "Overriding \`tagName\` on \`LinkTo\` components is not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-tagname",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{link-to "Link text" "routeName" tagName="button"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 35,
              "endColumn": 51,
              "endLine": 1,
              "line": 1,
              "message": "Overriding \`tagName\` on \`LinkTo\` components is not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-link-to-tagname",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});