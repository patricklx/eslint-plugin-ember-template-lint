import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-partial",

  config: true,

  good: ["{{foo}}", "{{button}}"],

  bad: [
    {
      template: '{{partial "foo"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{partial}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-partial",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
