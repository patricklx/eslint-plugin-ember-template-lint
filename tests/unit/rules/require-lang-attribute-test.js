import generateRuleTests from "../../helpers/rule-test-harness.js";

generateRuleTests({
  name: "require-lang-attribute",

  config: true,
  good: [
    '<html lang="en"></html>',
    '<html lang="en-US"></html>',
    "<html lang={{lang}}></html>",
    {
      config: {
        validateValues: true,
      },
      template: '<html lang="de"></html>',
    },
    {
      config: {
        validateValues: true,
      },
      template: "<html lang={{this.language}}></html>",
    },
    {
      config: {
        validateValues: false,
      },
      template: '<html lang="hurrah"></html>',
    },
    {
      config: {
        validateValues: false,
      },
      template: "<html lang={{this.blah}}></html>",
    },
  ],

  bad: [
    {
      template: "<html></html>",
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<html lang=""></html>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<html></html>",
      config: {
        validateValues: true,
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<html lang=""></html>',
      config: {
        validateValues: true,
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      // no config, allows validateValues to default to true
      template: '<html lang="gibberish"></html>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<html lang="gibberish"></html>',
      config: {
        validateValues: true,
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: "<html></html>",
      config: {
        validateValues: false,
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
    {
      template: '<html lang=""></html>',
      config: {
        validateValues: false,
      },
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "The \`<html>\` element must have the \`lang\` attribute with a valid value",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-lang-attribute",
              "severity": 2,
            },
          ]
        `);
      },
    },
  ],
});
