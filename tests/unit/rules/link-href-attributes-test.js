import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "link-href-attributes",

  config: true,

  good: [
    '<a href=""></a>' /* empty string is really valid! */,
    '<a href="#"></a>',
    '<a href="javascript:;"></a>',
    '<a href="http://localhost"></a>',
    "<a href={{link}}></a>",
  ],

  bad: [
    {
      template: "<a></a>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 8,
              "endLine": 1,
              "line": 1,
              "message": "a tags must have an href attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/link-href-attributes",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
