"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-route-action",
  config: true,
  good: [
  // SubExpression
  `{{custom-component onUpdate=(action 'updateFoo')}}`, `{{custom-component onUpdate=(fn this.updateFoo 'bar')}}`, `{{custom-component onUpdate=this.updateFoo}}`, `<CustomComponent @onUpdate={{if true (action 'updateFoo')}} />`, `<CustomComponent @onUpdate={{if true (fn this.updateFoo 'bar')}} />`, `<CustomComponent @onUpdate={{if true (this.updateFoo)}} />`, `{{yield (hash
      someProp="someVal"
      updateFoo=(fn this.updateFoo)
    )}}`,
  // MustacheStatement
  `<CustomComponent @onUpdate={{action 'updateFoo'}} />`, `<CustomComponent @onUpdate={{fn this.updateFoo 'bar'}} />`, `<CustomComponent @onUpdate={{this.updateFoo}} />`,
  // Other
  `<div></div>`],
  bad: [
  // SubExpression
  {
    template: `<CustomComponent @onUpdate={{if true (route-action 'updateFoo' 'bar')}} />`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 38,
              "endColumn": 70,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`route-action\` as (route-action 'updateFoo'). Instead, use controller actions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-route-action",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `{{custom-component onUpdate=(route-action 'updateFoo' 'bar')}}`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 29,
              "endColumn": 61,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`route-action\` as (route-action 'updateFoo'). Instead, use controller actions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-route-action",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `{{yield (hash
        someProp="someVal"
        updateFoo=(route-action 'updateFoo')
      )}}`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 45,
              "endLine": 3,
              "line": 3,
              "message": "Do not use \`route-action\` as (route-action 'updateFoo'). Instead, use controller actions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-route-action",
              "severity": 2,
            },
          ]
        `);
    }
  },
  // MustacheStatement
  {
    template: `<CustomComponent
        @onUpdate={{route-action 'updateFoo'}}
      />`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 47,
              "endLine": 2,
              "line": 2,
              "message": "Do not use \`route-action\` as {{route-action 'updateFoo'}}. Instead, use controller actions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-route-action",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: `<CustomComponent @onUpdate={{route-action 'updateBar' 'bar'}} />`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 28,
              "endColumn": 62,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`route-action\` as {{route-action 'updateBar'}}. Instead, use controller actions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-route-action",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});