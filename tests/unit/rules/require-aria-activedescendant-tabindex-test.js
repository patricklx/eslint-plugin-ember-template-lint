import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "require-aria-activedescendant-tabindex",

  config: true,

  good: [
    '<div tabindex="-1"></div>',
    '<div aria-activedescendant="some-id" tabindex=0></div>',
    '<input aria-activedescendant="some-id" />',
    "<input aria-activedescendant={{foo}} tabindex={{0}} />",
    '<div aria-activedescendant="option0" tabindex="0"></div>',
    '<CustomComponent aria-activedescendant="choice1" />',
    '<CustomComponent aria-activedescendant="option1" tabIndex="-1" />',
    "<CustomComponent aria-activedescendant={{foo}} tabindex={{bar}} />",
  ],
  bad: [
    {
      template: '<input aria-activedescendant="option0" tabindex="-2" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 56,
              "endLine": 1,
              "line": 1,
              "message": "A generic element using the aria-activedescendant attribute must have a tabindex",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-aria-activedescendant-tabindex",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<div aria-activedescendant={{bar}} />",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "A generic element using the aria-activedescendant attribute must have a tabindex",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-aria-activedescendant-tabindex",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<div aria-activedescendant={{foo}} tabindex={{-1}}></div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 58,
              "endLine": 1,
              "line": 1,
              "message": "A generic element using the aria-activedescendant attribute must have a tabindex",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-aria-activedescendant-tabindex",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div aria-activedescendant="fixme" tabindex=-100></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 56,
              "endLine": 1,
              "line": 1,
              "message": "A generic element using the aria-activedescendant attribute must have a tabindex",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-aria-activedescendant-tabindex",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
