import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-yield-only",

  config: true,

  good: [
    "{{yield (hash someProp=someValue)}}",
    "{{field}}",
    "{{#yield}}{{/yield}}",
    "<Yield/>",
    "<yield/>",
  ],

  bad: [
    {
      template: "{{yield}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 10,
              "endLine": 1,
              "line": 1,
              "message": "{{yield}}-only templates are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-only",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "     {{yield}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "{{yield}}-only templates are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-only",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "\n  {{yield}}\n     ",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 12,
              "endLine": 2,
              "line": 2,
              "message": "{{yield}}-only templates are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-yield-only",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
