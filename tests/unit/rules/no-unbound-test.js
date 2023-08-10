import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-unbound",

  config: true,

  good: ["{{foo}}", "{{button}}"],

  bad: [
    {
      template: "{{unbound foo}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{unbound}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbound",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{my-thing foo=(unbound foo)}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 16,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{unbound}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-unbound",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
