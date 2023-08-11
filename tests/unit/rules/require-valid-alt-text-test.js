"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-valid-alt-text",
  config: true,
  good: ['<img alt="hullo">', "<img alt={{foo}}>", '<img alt="blah {{derp}}">', '<img aria-hidden="true">', "<img hidden>", '<img alt="" role="none" src="zoey.jpg">', '<img alt="" role="presentation" src="zoey.jpg">', '<img alt="a stylized graphic of a female hamster" src="zoey.jpg">', '<img alt="some-alt-name">', '<img alt="name {{picture}}">', '<img alt="{{picture}}">', '<img alt="" role="none">', '<img alt="" role="presentation">',
  // Valid words containing redundant words.
  '<img alt="logout">', '<img alt="photography">', '<img alt="picturesque">', '<img alt="pilgrimage">', '<img alt="spacers">', "<img ...attributes>", '<input type="image" alt="some-alt">', '<input type="image" aria-labelledby="some-alt">', '<input type="image" aria-label="some-alt">', '<input type="image" hidden>', '<input type="image" aria-hidden="true">', '<object title="some-alt"></object>', '<object role="presentation"></object>', '<object role="none"></object>', "<object hidden></object>", '<object aria-hidden="true"></object>', '<object aria-labelledby="some-alt"></object>', '<object aria-label="some-alt"></object>', "<object>some text</object>", '<area alt="some-alt">', "<area hidden>", '<area aria-hidden="true">', '<area aria-labelledby="some-alt">', '<area aria-label="some-alt">', '<img role={{unless this.altText "presentation"}} alt={{this.altText}}>'],
  bad: [{
    template: "<img>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 6,
              "endLine": 1,
              "line": 1,
              "message": "All \`<img>\` tags must have an alt attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img src="zoey.jpg">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "All \`<img>\` tags must have an alt attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="" src="zoey.jpg">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "If the \`alt\` attribute is present and the value is an empty string, \`role="presentation"\` or \`role="none"\` must be present",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt src="zoey.jpg">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "If the \`alt\` attribute is present and the value is an empty string, \`role="presentation"\` or \`role="none"\` must be present",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="path/to/zoey.jpg" src="path/to/zoey.jpg">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "The alt text must not be the same as the image source",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<input type="image">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "All <input> elements with type="image" must have a text alternative through the \`alt\`, \`aria-label\`, or \`aria-labelledby\` attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<object></object>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby attributes.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<object />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 11,
              "endLine": 1,
              "line": 1,
              "message": "Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby attributes.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<area>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 7,
              "endLine": 1,
              "line": 1,
              "message": "Each area of an image map must have a text alternative through the \`alt\`, \`aria-label\`, or \`aria-labelledby\` attribute.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="picture">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 20,
              "endLine": 1,
              "line": 1,
              "message": "Invalid alt attribute. Words such as \`image\`, \`photo,\` or \`picture\` are already announced by screen readers.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="photo">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Invalid alt attribute. Words such as \`image\`, \`photo,\` or \`picture\` are already announced by screen readers.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="image">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 18,
              "endLine": 1,
              "line": 1,
              "message": "Invalid alt attribute. Words such as \`image\`, \`photo,\` or \`picture\` are already announced by screen readers.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="  IMAGE ">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 21,
              "endLine": 1,
              "line": 1,
              "message": "Invalid alt attribute. Words such as \`image\`, \`photo,\` or \`picture\` are already announced by screen readers.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="  IMAGE {{picture}} {{word}} ">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "Invalid alt attribute. Words such as \`image\`, \`photo,\` or \`picture\` are already announced by screen readers.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="52" src="b52.jpg">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 29,
              "endLine": 1,
              "line": 1,
              "message": "A number is not valid alt text",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="not-null-alt" src="zoey.jpg" role="none">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 52,
              "endLine": 1,
              "line": 1,
              "message": "The \`alt\` attribute should be empty if \`<img>\` has \`role\` of \`none\` or \`presentation\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<img alt="not-null-alt" src="zoey.jpg" role="presentation">',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 60,
              "endLine": 1,
              "line": 1,
              "message": "The \`alt\` attribute should be empty if \`<img>\` has \`role\` of \`none\` or \`presentation\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-valid-alt-text",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});