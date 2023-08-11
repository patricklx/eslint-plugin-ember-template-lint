"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-action-modifiers",
  config: true,
  good: ['<button onclick={{action "foo"}}></button>', '<a href="#" onclick={{action "foo"}}></a>', "<div action></div>", '{{foo-bar (action "foo")}}', "{{foo-bar action}}", {
    config: ["button"],
    template: '<button {{action "foo"}}></button>'
  }],
  bad: [{
    template: '<button {{action "foo"}}></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Do not use the \`action\` modifier. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action-modifiers",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a href="#" {{action "foo"}}></a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "Do not use the \`action\` modifier. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action-modifiers",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    config: ["button"],
    template: '<a href="#" {{action "foo"}}></a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "Do not use the \`action\` modifier. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action-modifiers",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});