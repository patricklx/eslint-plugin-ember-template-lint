"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-block-params-for-html-elements",
  config: true,
  good: ["<div></div>", "<Checkbox as |blockName|></Checkbox>", "<@nav.Link as |blockName|></@nav.Link>", "<this.foo as |blah|></this.foo>", "{{#let (component 'foo') as |bar|}} <bar @name=\"1\" as |n|><n/></bar> {{/let}}", "<Something><:Item as |foo|></:Item></Something>"],
  bad: [{
    template: "<div as |blockName|></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 27,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerBlock parameters on <div> elements are disallowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-block-params-for-html-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div as |a b c|></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerBlock parameters on <div> elements are disallowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-block-params-for-html-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});