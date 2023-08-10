import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-autofocus-attribute",

  config: true,

  good: [
    "<input />",
    '<input type="text" disabled="true" />',
    '<input type="password" disabled={{false}} />',
    '<input type="password" disabled />',
    '{{input type="text" disabled=true}}',
    '{{component "input" type="text" disabled=true}}',
    "<div></div>",
    "<h1><span>Valid Heading</span></h1>",
    "<CustomComponent />",
    "<CustomComponent disabled />",
    "<CustomComponent disabled=true />",
  ],

  bad: [
    {
      template: "<input autofocus />",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<input type="text" autofocus="autofocus" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 20,
              "endColumn": 41,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<input autofocus={{this.foo}} />",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{input type="text" autofocus=true}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 21,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "input" type="text" autofocus=true}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 33,
              "endColumn": 47,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div autofocus="true"></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<h1 autofocus="autofocus"><span>Valid Heading</span></h1>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 5,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<CustomComponent autofocus={{this.foo}} />",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 18,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "No autofocus attribute allowed, as it reduces accessibility by moving users to an element without warning and context",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-autofocus-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
