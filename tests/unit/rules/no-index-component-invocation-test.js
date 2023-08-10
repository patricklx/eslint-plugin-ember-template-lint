import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-index-component-invocation",

  config: "true",
  good: [
    "<Foo::Bar />",
    "<Foo::IndexItem />",
    "<Foo::MyIndex />",
    "<Foo::MyIndex></Foo::MyIndex>",
    "{{foo/index-item}}",
    "{{foo/my-index}}",
    "{{foo/bar}}",
    "{{#foo/bar}}{{/foo/bar}}",
    '{{component "foo/bar"}}',
    '{{component "foo/my-index"}}',
    '{{component "foo/index-item"}}',
    '{{#component "foo/index-item"}}{{/component}}',
  ],

  bad: [
    {
      template: "{{foo/index}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`{{foo/index ...\` to \`{{foo ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{component "foo/index"}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`{{component "foo/index" ...\` to \`{{component "foo" ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "{{#foo/index}}{{/foo/index}}",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 4,
              "endColumn": 13,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`{{#foo/index ...\` to \`{{#foo ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{#component "foo/index"}}{{/component}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`{{#component "foo/index" ...\` to \`{{#component "foo" ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{foo/bar (component "foo/index")}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 22,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`(component "foo/index" ...\` to \`(component "foo" ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '{{foo/bar name=(component "foo/index")}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 27,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`(component "foo/index" ...\` to \`(component "foo" ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<Foo::Index />",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`<Foo::Index ...\` to \`<Foo ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<Foo::Bar::Index />",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`<Foo::Bar::Index ...\` to \`<Foo::Bar ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<Foo::Index></Foo::Index>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "Replace \`<Foo::Index ...\` to \`<Foo ...\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-index-component-invocation",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
