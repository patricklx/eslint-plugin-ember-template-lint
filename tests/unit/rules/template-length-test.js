import generateRuleTests from "../../helpers/rule-test-harness.js";

describe("template-length", function () {
  generateRuleTests({
    name: "template-length",

    config: true,

    good: [
      "testing this\nand\nthis\nand\this",
      {
        config: { max: 10 },
        template: "testing\nthis\n",
      },
      {
        config: { min: 1 },
        template: "testing\nthis\nand\this\n",
      },
      {
        config: { min: 1, max: 5 },
        template: "testing\nthis\nandthis\n",
      },
    ],

    bad: [
      {
        config: { min: 10 },
        template: "testing\ntoo-short template\n",

        verifyResults(results) {
          expect(results).toMatchInlineSnapshot(`
            [
              {
                "column": 1,
                "endColumn": 1,
                "endLine": 3,
                "line": 1,
                "message": "GlimmerTemplate length of 3 is smaller than 10",
                "nodeType": null,
                "ruleId": "ember-template-lint/template-length",
                "severity": 2,
              },
            ]
          `);
        },
      },
      {
        config: { max: 3 },
        template: "test\nthis\nand\nthis\n",

        verifyResults(results) {
          expect(results).toMatchInlineSnapshot(`
            [
              {
                "column": 1,
                "endColumn": 1,
                "endLine": 5,
                "line": 1,
                "message": "GlimmerTemplate length of 5 exceeds 3",
                "nodeType": null,
                "ruleId": "ember-template-lint/template-length",
                "severity": 2,
              },
            ]
          `);
        },
      },
    ],
  });
});
