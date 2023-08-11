"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "require-media-caption",
  config: true,
  good: ['<video><track kind="captions" /></video>', '<audio muted="true"></audio>', "<video muted></video>", "<audio muted={{this.muted}}></audio>", '<video><track kind="captions" /><track kind="descriptions" /></video>'],
  bad: [{
    template: "<video></video>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 16,
              "endLine": 1,
              "line": 1,
              "message": "Media elements such as <audio> and <video> must have a <track> for captions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-media-caption",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<audio><track /></audio>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 25,
              "endLine": 1,
              "line": 1,
              "message": "Media elements such as <audio> and <video> must have a <track> for captions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-media-caption",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<video><track kind="subtitles" /></video>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 42,
              "endLine": 1,
              "line": 1,
              "message": "Media elements such as <audio> and <video> must have a <track> for captions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-media-caption",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<audio muted="false"></audio>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "Media elements such as <audio> and <video> must have a <track> for captions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-media-caption",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<audio muted="false"><track kind="descriptions" /></audio>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 59,
              "endLine": 1,
              "line": 1,
              "message": "Media elements such as <audio> and <video> must have a <track> for captions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-media-caption",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<video muted=false></video>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 1,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "Media elements such as <audio> and <video> must have a <track> for captions.",
              "nodeType": null,
              "ruleId": "ember-template-lint/require-media-caption",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});