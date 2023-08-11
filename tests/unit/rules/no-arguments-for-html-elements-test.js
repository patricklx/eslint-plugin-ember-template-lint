"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-arguments-for-html-elements",
  config: true,
  good: ["<Input @name=1 />", "{{#let (component 'foo') as |bar|}} <bar @name=\"1\" as |n|><n/></bar> {{/let}}", "<@externalComponent />", `<MyComponent>
    <:slot @name="Header"></:slot>
  </MyComponent>`, '<@foo.bar @name="2" />', '<this.name @boo="bar"></this.name>', '<@foo @name="2" />', '<foo.some.name @name="1" />'],
  bad: [{
    template: '<div @value="1"></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "Arguments (@value) should not be used on HTML elements (<div>).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-arguments-for-html-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<div @value></div>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "Arguments (@value) should not be used on HTML elements (<div>).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-arguments-for-html-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img @src="12">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "Arguments (@src) should not be used on HTML elements (<img>).",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-arguments-for-html-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});