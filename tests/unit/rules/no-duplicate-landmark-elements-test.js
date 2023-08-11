"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-duplicate-landmark-elements",
  config: true,
  good: ['<nav aria-label="primary site navigation"></nav><nav aria-label="secondary site navigation within home page"></nav>', '<nav aria-label="primary site navigation"></nav><div role="navigation" aria-label="secondary site navigation within home page"></div>', "<nav aria-label={{siteNavigation}}></nav><nav aria-label={{siteNavigation}}></nav>",
  // since we can't confirm what the role of the div is, we have to let it pass
  '<nav aria-label="primary site navigation"></nav><div role={{role}} aria-label="secondary site navigation within home page"></div>', '<form aria-labelledby="form-title"><div id="form-title">Shipping Address</div></form><form aria-label="meaningful title of second form"></form>', '<form role="search"></form><form></form>', "<header></header><main></main><footer></footer>", '<nav aria-label="primary navigation"></nav><nav aria-label={{this.something}}></nav>', '<img role="none"><img role="none">'],
  bad: [{
    template: "<nav></nav><nav></nav>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<nav></nav><div role="navigation"></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 12,
              "endColumn": 41,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<nav></nav><nav aria-label="secondary navigation"></nav>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 12,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<main></main><div role="main"></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 14,
              "endColumn": 37,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<nav aria-label="site navigation"></nav><nav aria-label="site navigation"></nav>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 41,
              "endColumn": 81,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<form aria-label="search-form"></form><form aria-label="search-form"></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 39,
              "endColumn": 77,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<form aria-labelledby="form-title"></form><form aria-labelledby="form-title"></form>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 43,
              "endColumn": 85,
              "endLine": 1,
              "line": 1,
              "message": "If multiple landmark elements (or elements with an equivalent role) of the same type are found on a page, they must each have a unique label.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-duplicate-landmark-elements",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});