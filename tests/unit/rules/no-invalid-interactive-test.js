import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-invalid-interactive",

  config: true,

  good: [
    '<button {{action "foo"}}></button>',
    '<canvas {{on "mousedown"}}></canvas>',
    '<div role="button" {{action "foo"}}></div>',
    "<div randomProperty={{myValue}}></div>",
    '<li><button {{action "foo"}}></button></li>',
    '<form {{action "foo" on="submit"}}></form>',
    '<form onsubmit={{action "foo"}}></form>',
    '<form onchange={{action "foo"}}></form>',
    '<form {{action "foo" on="reset"}}></form>',
    '<form {{action "foo" on="change"}}></form>',
    '<form onreset={{action "foo"}}></form>',
    '<img onerror={{action "foo"}}>',
    '<img onload={{action "foo"}}>',
    '<InputSearch @onInput={{action "foo"}} />',
    '<InputSearch @onInput={{action "foo"}}></InputSearch>',
    '{{#with (hash bar=(component "foo")) as |foo|}}<foo.bar @onInput={{action "foo"}}></foo.bar>{{/with}}',
    '<form {{on "submit" this.send}}></form>',
    '<form {{on "reset" this.reset}}></form>',
    '<form {{on "change" this.change}}></form>',
    '<div {{on "scroll" this.handleScroll}}></div>',
    '<code {{on "copy" (action @onCopy)}}></code>',
    {
      config: { additionalInteractiveTags: ["div"] },
      template: '<div {{on "click" this.onClick}}></div>',
    },
    {
      config: { additionalInteractiveTags: ["div"] },
      template: '<div {{action "foo"}}></div>',
    },
    {
      config: { additionalInteractiveTags: ["div"] },
      template: '<div onclick={{action "foo"}}></div>',
    },
    {
      config: { additionalInteractiveTags: ["img"] },
      template: '<img onerror={{action "foo"}}>',
    },
    {
      config: { ignoredTags: ["div"] },
      template: '<div {{on "click" this.actionName}}>...</div>',
    },
    {
      config: { ignoredTags: ["div"] },
      template: '<div onclick={{action "foo"}}></div>',
    },
    '<img {{on "load" this.onLoad}} {{on "error" this.onError}}>',
  ],

  bad: [
    {
      template: '<div {{on "click" this.actionName}}>...</div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div {{action "foo"}}></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template: '<div onclick={{action "foo"}}></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      // This example is detected solely based on the DOM event attribute name.
      template: '<div onclick={{pipe-action "foo"}}></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template: '<div onsubmit={{action "foo"}}></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      // Any usage of the `action` helper will be caught, regardless of the attribute name.
      template: '<div randomAttribute={{action "foo"}}></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template: '<form {{action "foo" on="click"}}></form>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 7,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },

    {
      template: '<div {{action "foo" on="submit"}}></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Interaction added to non-interactive element",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-interactive",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
