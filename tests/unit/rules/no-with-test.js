import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-with",

  config: true,

  good: [
    "{{@with}}",
    "{{this.with}}",
    '{{with "foo" bar="baz"}}',
    "{{#if @model.posts}}{{@model.posts}}{{/if}}",
    "{{#let @model.posts as |blogPosts|}}{{blogPosts}}{{/let}}",
  ],

  bad: [
    {
      template: "{{#with this.foo as |bar|}}{{bar}}{{/with}}",

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 44,
              "endLine": 1,
              "line": 1,
              "message": "The use of \`{{with}}\` has been deprecated. Please see the deprecation guide at https://deprecations.emberjs.com/v3.x/#toc_ember-glimmer-with-syntax.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-with",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template:
        '{{#with (hash firstName="John" lastName="Doe") as |user|}}{{user.firstName}} {{user.lastName}}{{/with}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 104,
              "endLine": 1,
              "line": 1,
              "message": "The use of \`{{with}}\` has been deprecated. Please see the deprecation guide at https://deprecations.emberjs.com/v3.x/#toc_ember-glimmer-with-syntax.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-with",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
