"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-unbalanced-curlies",
  config: true,
  good: ["{foo}", "{{foo}}", "{{{foo}}}", "{{{foo\n}}}", "\\{{foo}}", "\\{{foo}}\\{{foo}}", "\\{{foo}}{{foo}}", "\\{{foo\n}}"],
  bad: [{
    template: "foo}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 6,
              "endLine": 1,
              "line": 1,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{foo}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 5,
              "endColumn": 7,
              "endLine": 1,
              "line": 1,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "foo}}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 7,
              "endLine": 1,
              "line": 1,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{foo}}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 5,
              "endColumn": 8,
              "endLine": 1,
              "line": 1,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{foo\n}}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 2,
              "endColumn": 4,
              "endLine": 2,
              "line": 2,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{foo\n}}}\nbar",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 2,
              "endColumn": 4,
              "endLine": 3,
              "line": 2,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{foo\r\nbar\r\n\r\nbaz}}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 5,
              "endColumn": 7,
              "endLine": 4,
              "line": 4,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{foo\rbar\r\rbaz}}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 5,
              "endColumn": 7,
              "endLine": 4,
              "line": 4,
              "message": "Unbalanced curlies detected",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbalanced-curlies",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});