"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: 'no-html-comments',
  config: true,
  good: ['{{!-- comment here --}}', '{{!--comment here--}}', '{{! template-lint-disable no-bare-strings }}', '{{! template-lint-disable }}', '{{! template-lint-disable no-html-comments }}<!-- lol -->'],
  bad: [{
    template: '<!-- comment here -->',
    fixedTemplate: '{{!-- comment here --}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 21,
              "endLine": 1,
              "filePath": "layout.hbs",
              "fix": {
                "text": "{{! comment here }}",
              },
              "isFixable": true,
              "line": 1,
              "message": "HTML comment detected",
              "rule": "no-html-comments",
              "severity": 2,
              "source": "<!-- comment here -->",
            },
          ]
        `);
    }
  }, {
    template: '<!--comment here-->',
    fixedTemplate: '{{!--comment here--}}',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 19,
              "endLine": 1,
              "filePath": "layout.hbs",
              "fix": {
                "text": "{{!comment here}}",
              },
              "isFixable": true,
              "line": 1,
              "message": "HTML comment detected",
              "rule": "no-html-comments",
              "severity": 2,
              "source": "<!--comment here-->",
            },
          ]
        `);
    }
  }]
});