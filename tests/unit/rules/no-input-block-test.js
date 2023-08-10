import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-input-block",

  config: true,

  good: ["{{button}}", "{{#x-button}}{{/x-button}}", "{{input}}"],

  bad: [
    {
      template: "{{#input}}{{/input}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected block usage. The {{input}} helper may only be used inline.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-input-block",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
