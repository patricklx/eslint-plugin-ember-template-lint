import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-nested-splattributes",

  config: true,

  good: [
    "<div>...</div>",
    "<div><div ...attributes>...</div></div>",
    "<div ...attributes>...</div>",
    "<div ...attributes>...</div><div ...attributes>...</div>",
  ],

  bad: [
    {
      template:
        "<div ...attributes>\n" +
        "  <div ...attributes>\n" +
        "    ...\n" +
        "  </div>\n" +
        "</div>\n",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 8,
              "endColumn": 21,
              "endLine": 2,
              "line": 2,
              "message": "Nested splattributes are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-splattributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        "<div ...attributes>\n" +
        "  <div>\n" +
        "    <div ...attributes>\n" +
        "    ...\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>\n",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 10,
              "endColumn": 23,
              "endLine": 3,
              "line": 3,
              "message": "Nested splattributes are not allowed",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-splattributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
