import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-action",

  config: true,

  good: [
    "{{#let (fn this.foo bar) as |action|}}<Component @baz={{action}} />{{/let}}",
    "<MyScope as |action|><Component @baz={{action}} /></MyScope>",
    '<button {{on "submit" @action}}>Click Me</button>',
    '<button {{on "submit" this.action}}>Click Me</button>',
    // check for scope.getLocalName working for primitives and locals #881
    "<PButton @naked={{42}} />",
    "<PButton @naked={{true}} />",
    "<PButton @naked={{undefined}} />",
    "<PButton @naked={{null}} />",
    "<PButton @naked={{this}} />",
    '<PButton @naked={{"action"}} />',
  ],

  bad: [
    {
      template: '<button onclick={{action "foo"}}></button>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`action\` as {{action ...}}. Instead, use the \`on\` modifier and \`fn\` helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<button {{action "submit"}}>Submit</button>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`action\` as <button {{action ...}} />. Instead, use the \`on\` modifier and \`fn\` helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<FooBar @baz={{action "submit"}} />',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`action\` as {{action ...}}. Instead, use the \`on\` modifier and \`fn\` helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{yield (action "foo")}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`action\` as (action ...). Instead, use the \`on\` modifier and \`fn\` helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{yield (action this.foo)}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "Do not use \`action\` as (action ...). Instead, use the \`on\` modifier and \`fn\` helper.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-action",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
