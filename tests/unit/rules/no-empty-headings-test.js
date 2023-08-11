"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-empty-headings",
  config: true,
  good: ["<h1>Accessible Heading</h1>", "<h1>Accessible&nbsp;Heading</h1>", '<h1 aria-hidden="true">Valid Heading</h1>', '<h1 aria-hidden="true"><span>Valid Heading</span></h1>', '<h1 aria-hidden="false">Accessible Heading</h1>', "<h1 hidden>Valid Heading</h1>", "<h1 hidden><span>Valid Heading</span></h1>", '<h1><span aria-hidden="true">Hidden text</span><span>Visible text</span></h1>', '<h1><span aria-hidden="true">Hidden text</span>Visible text</h1>', '<div role="heading" aria-level="1">Accessible Text</div>', '<div role="heading" aria-level="1"><span>Accessible Text</span></div>', '<div role="heading" aria-level="1"><span aria-hidden="true">Hidden text</span><span>Visible text</span></div>', '<div role="heading" aria-level="1"><span aria-hidden="true">Hidden text</span>Visible text</div>', "<div></div>", "<p></p>", "<span></span>", "<header></header>", "<h2><CustomComponent /></h2>", "<h2>{{@title}}</h2>", "<h2>{{#component}}{{/component}}</h2>", "<h2><span>{{@title}}</span></h2>", "<h2><div><CustomComponent /></div></h2>", "<h2><div></div><CustomComponent /></h2>", "<h2><div><span>{{@title}}</span></div></h2>", "<h2><span>Some text{{@title}}</span></h2>", "<h2><span><div></div>{{@title}}</span></h2>"],
  bad: [{
    template: "<h1></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 10,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1> \n &nbsp;</h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 13,
              "endLine": 2,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span></span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 23,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span> \n &nbsp;</span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 20,
              "endLine": 2,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><div><span></span></div></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 34,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span></span><span></span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<h1> &nbsp; <div aria-hidden="true">Some hidden text</div></h1>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 64,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<h1><span aria-hidden="true">Inaccessible text</span></h1>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 59,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span hidden>Inaccessible text</span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 47,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span hidden>{{@title}}</span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 40,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span hidden>{{#component}}Inaccessible text{{/component}}</span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 75,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<h1><span hidden><CustomComponent>Inaccessible text</CustomComponent></span></h1>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 82,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<h1><span aria-hidden="true">Hidden text</span><span aria-hidden="true">Hidden text</span></h1>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 96,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="heading" aria-level="1"></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="heading" aria-level="1"><span aria-hidden="true">Inaccessible text</span></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 91,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<div role="heading" aria-level="1"><span hidden>Inaccessible text</span></div>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 79,
              "endLine": 1,
              "line": 1,
              "message": "Headings (h1, h2, etc. or ARIA:heading role elements) must contain accessible text content.",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-empty-headings",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});