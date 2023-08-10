import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "no-abstract-roles",

  config: true,

  good: [
    '<img alt="" role="none" src="zoey.jpg">',
    '<img alt="" role="presentation" src="zoey.jpg">',
  ],

  bad: [
    {
      template: '<img role="command">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "command is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="composite">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "composite is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<input role="input">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "input is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="landmark">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "landmark is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<input role="range">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "range is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="roletype">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "roletype is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="section">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "section is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="sectionhead">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "sectionhead is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<select role="select"></select>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 32,
              "endLine": 1,
              "line": 1,
              "message": "select is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<div role="structure"></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "structure is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="widget">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "widget is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<img role="window">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "window is an abstract role, and is not a valid value for the role attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-abstract-roles",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
