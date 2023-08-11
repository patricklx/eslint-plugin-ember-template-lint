"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-args-paths",
  config: "true",
  good: ["<div @foo={{cleanup this.args}}></div>", "{{foo (name this.args)}}", "{{foo name=this.args}}", "{{foo name=(extract this.args)}}", "<Foo @params={{this.args}} />", "<Foo {{mod this.args}} />", "<Foo {{mod items=this.args}} />", "<Foo {{mod items=(extract this.args)}} />"],
  bad: [{
    template: "{{hello (format value=args.foo)}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 23,
              "endColumn": 31,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo" usage, try "@foo" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{hello value=args.foo}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo" usage, try "@foo" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{hello (format args.foo.bar)}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 17,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo.bar" usage, try "@foo.bar" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<br {{hello args.foo.bar}}>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 13,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo.bar" usage, try "@foo.bar" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{hello args.foo.bar}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo.bar" usage, try "@foo.bar" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{args.foo.bar}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 15,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo.bar" usage, try "@foo.bar" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{args.foo}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 11,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "args.foo" usage, try "@foo" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{this.args.foo}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "GlimmerComponent templates should avoid "this.args.foo" usage, try "@foo" instead.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-args-paths",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});