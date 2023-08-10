import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "splat-attributes-only",

  config: true,

  good: [
    "<div ...attributes></div>",
    "<div attributes></div>",
    "<div arguments></div>",
    "<div><div ...attributes></div></div>",
  ],

  bad: [
    {
      template: "<div ...arguments></div>",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Only \`...attributes\` can be applied to elements",
              "nodeType": null,
              "ruleId": "ember-template-lint/splat-attributes-only",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
