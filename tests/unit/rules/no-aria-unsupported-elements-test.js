import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-aria-unsupported-elements",

  config: true,

  good: [
    '<meta charset="UTF-8" />',
    '<html lang="en"></html>',
    "<script></script>",
    "<div></div>",
    '<div aria-foo="true"></div>',
    '<div role="foo"></div>',
  ],

  bad: [
    {
      template: '<meta charset="UTF-8" aria-hidden="false" />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 45,
              "endLine": 1,
              "line": 1,
              "message": "The <meta> element does not support the use of ARIA roles, states, and properties such as "aria-hidden"",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-aria-unsupported-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<html lang="en" role="application"></html>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 43,
              "endLine": 1,
              "line": 1,
              "message": "The <html> element does not support the use of ARIA roles, states, and properties such as "role"",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-aria-unsupported-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<script aria-hidden="false"></script>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "The <script> element does not support the use of ARIA roles, states, and properties such as "aria-hidden"",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-aria-unsupported-elements",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
