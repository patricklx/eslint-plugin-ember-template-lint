"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-invalid-link-text",
  config: true,
  good: ['<a href="https://myurl.com">Click here to read more about this amazing adventure</a>', "{{#link-to}} click here to read more about our company{{/link-to}}", "<LinkTo>Read more about ways semantic HTML can make your code more accessible.</LinkTo>", "<LinkTo>{{foo}} more</LinkTo>", '<a href="https://myurl.com" aria-labelledby="some-id"></a>', '<a href="https://myurl.com" aria-label="click here to read about our company"></a>', '<a href="https://myurl.com" aria-hidden="true"></a>', '<a href="https://myurl.com" hidden></a>', '<LinkTo aria-label={{t "some-translation"}}>A link with translation</LinkTo>', '<a href="#" aria-label={{this.anAriaLabel}}>A link with a variable as aria-label</a>', {
    config: {
      allowEmptyLinks: true
    },
    template: '<a href="https://myurl.com"></a>'
  }],
  bad: [{
    template: '<a href="https://myurl.com">click here</a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 43,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<LinkTo>click here</LinkTo>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#link-to}}click here{{/link-to}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 35,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a href="https://myurl.com"></a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a href="https://myurl.com"> </a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a href="https://myurl.com"> &nbsp; \n</a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 5,
              "endLine": 2,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a aria-labelledby="" href="https://myurl.com">Click here</a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 62,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a aria-labelledby=" " href="https://myurl.com">Click here</a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 63,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a aria-label="Click here" href="https://myurl.com">Click here</a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 67,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<LinkTo></LinkTo>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<LinkTo> &nbsp; \n</LinkTo>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 10,
              "endLine": 2,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#link-to}}{{/link-to}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#link-to}} &nbsp; \n{{/link-to}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 2,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    config: {
      allowEmptyLinks: false
    },
    template: "{{#link-to}} &nbsp; \n{{/link-to}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 2,
              "line": 1,
              "message": "Links should have descriptive text",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-invalid-link-text",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});