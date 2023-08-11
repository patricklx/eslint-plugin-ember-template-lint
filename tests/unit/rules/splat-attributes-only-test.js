"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "splat-attributes-only",
  config: true,
  good: ["<div ...attributes></div>", "<div attributes></div>", "<div arguments></div>", "<div><div ...attributes></div></div>"],
  bad: [{
    template: "<div ...arguments></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Only \`...attributes\` can be applied to elements",
              "nodeType": null,
              "ruleId": "ember-template-lint/splat-attributes-only",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});