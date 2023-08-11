"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-outlet-outside-routes",
  config: true,
  good: ["{{foo}}", "{{button}}", {
    template: "{{outlet}}",
    meta: {
      filePath: "app/templates/foo/route.hbs"
    }
  }, {
    template: "{{outlet}}",
    meta: {
      filePath: "app/templates/routes/foo.hbs"
    }
  }, {
    template: "{{#outlet}}Why?!{{/outlet}}",
    meta: {
      filePath: "app/templates/foo/route.hbs"
    }
  }, {
    template: "{{#outlet}}Why?!{{/outlet}}",
    meta: {
      filePath: "app/templates/routes/foo.hbs"
    }
  }, {
    template: "{{#outlet}}Works because ambiguous{{/outlet}}",
    meta: {
      filePath: "app/templates/something/foo.hbs"
    }
  }, {
    template: "{{outlet}}",
    meta: {
      filePath: "components/templates/application.hbs"
    }
  }],
  bad: [{
    template: "{{outlet}}",
    meta: {
      filePath: "app/templates/components/foo/layout.hbs"
    },
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 10,
              "endLine": 1,
              "filePath": "app/templates/components/foo/layout.hbs",
              "line": 1,
              "message": "Unexpected {{outlet}} usage. Only use {{outlet}} within a route template.",
              "rule": "no-outlet-outside-routes",
              "severity": 2,
              "source": "{{outlet}}",
            },
          ]
        `);
    }
  }, {
    template: "{{outlet}}",
    meta: {
      filePath: "app/templates/foo/-mything.hbs"
    },
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 11,
              "endLine": 1,
              "line": 1,
              "message": "Unexpected {{outlet}} usage. Only use {{outlet}} within a route template.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-outlet-outside-routes",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{outlet}}",
    meta: {
      filePath: "app/components/foo/layout.hbs"
    },
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 10,
              "endLine": 1,
              "filePath": "app/components/foo/layout.hbs",
              "line": 1,
              "message": "Unexpected {{outlet}} usage. Only use {{outlet}} within a route template.",
              "rule": "no-outlet-outside-routes",
              "severity": 2,
              "source": "{{outlet}}",
            },
          ]
        `);
    }
  }]
});