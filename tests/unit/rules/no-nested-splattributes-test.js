"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-nested-splattributes",
  config: true,
  good: ["<div>...</div>", "<div><div ...attributes>...</div></div>", "<div ...attributes>...</div>", "<div ...attributes>...</div><div ...attributes>...</div>"],
  bad: [{
    template: "<div ...attributes>\n" + "  <div ...attributes>\n" + "    ...\n" + "  </div>\n" + "</div>\n",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 21,
              "endLine": 2,
              "line": 2,
              "message": "Nested splattributes are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-splattributes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div ...attributes>\n" + "  <div>\n" + "    <div ...attributes>\n" + "    ...\n" + "    </div>\n" + "  </div>\n" + "</div>\n",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 23,
              "endLine": 3,
              "line": 3,
              "message": "Nested splattributes are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-splattributes",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});