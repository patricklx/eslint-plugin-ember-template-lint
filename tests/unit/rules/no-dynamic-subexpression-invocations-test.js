"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-dynamic-subexpression-invocations",
  config: true,
  good: ['{{something "here"}}', "{{something}}", '{{something here="goes"}}', '<button onclick={{fn something "here"}}></button>', '{{@thing "somearg"}}', '<Foo @bar="asdf" />', '<Foo @bar={{"asdf"}} />', "<Foo @bar={{true}} />", "<Foo @bar={{false}} />", "<Foo @bar={{undefined}} />", "<Foo @bar={{null}} />", "<Foo @bar={{1}} />", "{{1}}", "{{true}}", "{{null}}", "{{undefined}}", '{{"foo"}}'],
  bad: [{
    template: '<Foo bar="{{@thing "some-arg"}}" />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 32,
              "endLine": 1,
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Foo {{this.foo}} />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "You cannot invoke a dynamic value in the GlimmerElementModifierStatement position",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Foo {{@foo}} />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 14,
              "endLine": 1,
              "line": 1,
              "message": "You cannot invoke a dynamic value in the GlimmerElementModifierStatement position",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<Foo {{foo.bar}} />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 17,
              "endLine": 1,
              "line": 1,
              "message": "You cannot invoke a dynamic value in the GlimmerElementModifierStatement position",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button onclick={{@thing "some-arg"}}></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 38,
              "endLine": 1,
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{#let "whatever" as |thing|}}<button onclick={{thing "some-arg"}}></button>{{/let}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 46,
              "endColumn": 66,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "rule": "no-dynamic-subexpression-invocations",
              "severity": 2,
              "source": "{{thing \\"some-arg\\"}}",
            },
          ]
        `);
    }
  }, {
    template: '<button onclick={{this.thing "some-arg"}}></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button onclick={{lol.other.path "some-arg"}}></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 46,
              "endLine": 1,
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '{{if (this.foo) "true" "false"}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 6,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "You cannot invoke a dynamic value in the GlimmerSubExpression position",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<Foo @bar={{@thing "some-arg"}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 11,
              "endColumn": 32,
              "endLine": 1,
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<Foo onclick={{@thing "some-arg"}} />',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "You must use the \`fn\` helper to create a function with arguments to invoke",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-dynamic-subexpression-invocations",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});