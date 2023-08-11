"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-invalid-meta",
  config: true,
  good: ["<meta>", '<meta charset="UTF-8">', '<meta http-equiv="refresh" content="0; url=http://www.example.com">', '<meta http-equiv="refresh" content="72001">', "<meta http-equiv={{httpEquiv}} content={{content}}>", '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">', '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable = yes">', '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable= yes">', '<meta name="viewport" content="width=device-width, initial-scale=1">', "<meta name={{name}} content={{content}}>", '<meta property="og:type" content="website">', '<meta itemprop="type" content="website">',
  // doesn't error on unrelated elements
  "<div></div>"],
  bad: [{
    template: '<meta http-equiv="refresh" content="1; url=http://www.example.com">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 68,
              "endLine": 1,
              "line": 1,
              "message": "a meta redirect should not have a delay value greater than zero",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta http-equiv="refresh" content="71999">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 44,
              "endLine": 1,
              "line": 1,
              "message": "a meta refresh should have a delay greater than 72000 seconds",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta name="viewport" content="user-scalable=no">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 50,
              "endLine": 1,
              "line": 1,
              "message": "a meta viewport should not restrict user-scalable",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta name="viewport" content="user-scalable = no">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "a meta viewport should not restrict user-scalable",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta name="viewport" content="user-scalable= no">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 51,
              "endLine": 1,
              "line": 1,
              "message": "a meta viewport should not restrict user-scalable",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 90,
              "endLine": 1,
              "line": 1,
              "message": "a meta viewport should not set a maximum scale on content",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta name="viewport">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta property="og:type">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta itemprop="type">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta http-equiv="refresh">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<meta content="72001">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "a meta content attribute cannot be defined if the name, property, itemprop nor the http-equiv attributes are defined",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-meta",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});