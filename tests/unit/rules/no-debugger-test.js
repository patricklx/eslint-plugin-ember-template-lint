"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-debugger",
  config: true,
  good: ["{{foo}}", "{{button}}"],
  bad: [{
    template: "{{debugger}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{debugger}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-debugger",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#debugger}}Invalid!{{/debugger}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{debugger}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-debugger",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});