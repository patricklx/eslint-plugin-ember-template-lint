import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-debugger",

  config: true,

  good: ["{{foo}}", "{{button}}"],

  bad: [
    {
      template: "{{debugger}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{debugger}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-debugger",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{#debugger}}Invalid!{{/debugger}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{debugger}} usage.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-debugger",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
