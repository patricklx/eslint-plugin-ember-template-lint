"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-potential-path-strings",
  config: true,
  good: ['<img src="foo.png">', "<img src={{picture}}>", "<img src={{this.picture}}>", "<img src={{@img}}>", "<SomeComponent @foo={{@bar}} />"],
  bad: [{
    template: '<img src="this.picture">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "Potential path in attribute string detected. Did you mean {{this.picture}}?",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-potential-path-strings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<img src=this.picture>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "Potential path in attribute string detected. Did you mean {{this.picture}}?",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-potential-path-strings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img src="@img">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "Potential path in attribute string detected. Did you mean {{@img}}?",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-potential-path-strings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<img src=@img>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "Potential path in attribute string detected. Did you mean {{@img}}?",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-potential-path-strings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<SomeComponent @foo=@bar />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 21,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Potential path in attribute string detected. Did you mean {{@bar}}?",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-potential-path-strings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<SomeComponent @foo=this.bar />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 21,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "Potential path in attribute string detected. Did you mean {{this.bar}}?",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-potential-path-strings",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});