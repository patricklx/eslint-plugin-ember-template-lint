"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "link-href-attributes",
  config: true,
  good: ['<a href=""></a>' /* empty string is really valid! */, '<a href="#"></a>', '<a href="javascript:;"></a>', '<a href="http://localhost"></a>', "<a href={{link}}></a>"],
  bad: [{
    template: "<a></a>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 8,
              "endLine": 1,
              "line": 1,
              "message": "a tags must have an href attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/link-href-attributes",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});