"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-partial",
  config: true,
  good: ["{{foo}}", "{{button}}"],
  bad: [{
    template: '{{partial "foo"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{partial}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-partial",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});