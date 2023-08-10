import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "require-splattributes",

  config: true,

  good: [
    "<div ...attributes></div>",
    "<Foo ...attributes></Foo>",
    "<div ...attributes />",
    "<div><Foo ...attributes /></div>",
    "<div ...attributes></div><div></div>",
    "<div></div><div ...attributes></div><div></div>",
  ],

  bad: [
    {
      template: "<div></div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "The root element in this template should use \`...attributes\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-splattributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<Foo></Foo>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "The root element in this template should use \`...attributes\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-splattributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<div></div><div></div>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "At least one element in this template should use \`...attributes\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-splattributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<div/>\n\n",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 7,
              "endLine": 1,
              "line": 1,
              "message": "The root element in this template should use \`...attributes\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-splattributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
