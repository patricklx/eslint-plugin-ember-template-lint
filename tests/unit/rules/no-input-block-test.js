"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-input-block",
  config: true,
  good: ["{{button}}", "{{#x-button}}{{/x-button}}", "{{input}}"],
  bad: [{
    template: "{{#input}}{{/input}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected block usage. The {{input}} helper may only be used inline.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-block",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});