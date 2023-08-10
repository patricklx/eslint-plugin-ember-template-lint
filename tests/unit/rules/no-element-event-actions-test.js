import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-element-event-actions",

  config: true,

  good: [
    "<button></button>",
    '<button type="button" on={{action "myAction"}}></button>',
    '<button type="button" onclick="myFunction()"></button>',
    '<button type="button" {{action "myAction"}}></button>',
    '<button type="button" value={{value}}></button>',
    '{{my-component onclick=(action "myAction") someProperty=true}}',
    '<SiteHeader @someFunction={{action "myAction"}} @user={{this.user}} />',
    {
      config: { requireActionHelper: true },
      template: '<button type="button" onclick={{this.myAction}}></button>',
    },
    {
      config: { requireActionHelper: false },
      template: '<button type="button" onclick="myFunction()"></button>',
    },
  ],

  bad: [
    {
      template:
        '<button onclick={{action "myAction"}} ONFOCUS={{action "myAction"}} otherProperty=true></button>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "Do not use HTML element event properties like \`onclick\`. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-element-event-actions",
              "severity": 2,
            },
            {
              "column": 39,
              "endColumn": 68,
              "endLine": 1,
              "line": 1,
              "message": "Do not use HTML element event properties like \`onclick\`. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-element-event-actions",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template:
        '<SiteHeader onclick={{action "myAction"}} @user={{this.user}} />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "Do not use HTML element event properties like \`onclick\`. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-element-event-actions",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      config: { requireActionHelper: false },
      template: '<button type="button" onclick={{this.myAction}}></button>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 48,
              "endLine": 1,
              "line": 1,
              "message": "Do not use HTML element event properties like \`onclick\`. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-element-event-actions",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<button type="button" onclick={{this.myAction}}></button>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 48,
              "endLine": 1,
              "line": 1,
              "message": "Do not use HTML element event properties like \`onclick\`. Instead, use the \`on\` modifier.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-element-event-actions",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],

  error: [
    {
      config: null,
      template: "test",

      result: {
        fatal: true,
        message: "You specified `null`",
      },
    },
    {
      config: "true",
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `"true"`',
      },
    },
    {
      config: { invalidOption: true },
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `{"invalidOption":true}`',
      },
    },
    {
      config: { requireActionHelper: "true" },
      template: "test",

      result: {
        fatal: true,
        message: 'You specified `{"requireActionHelper":"true"}`',
      },
    },
  ],
});
