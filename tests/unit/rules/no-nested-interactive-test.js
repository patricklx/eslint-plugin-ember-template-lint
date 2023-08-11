"use strict";

var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _ruleTestHarness.default)({
  name: "no-nested-interactive",
  config: true,
  good: ["<button>button</button>", "<button>button <strong>!!!</strong></button>", "<a><button>button</button></a>", '<a href="/">link</a>', '<a href="/">link <strong>!!!</strong></a>', '<button><input type="hidden"></button>', "<div tabindex=-1><button>Click me!</button></div>", '<div tabindex="1"><button></button></div>', "<label><input></label>", `
    <ul role="menubar" aria-label="functions" id="appmenu">
      <li role="menuitem" aria-haspopup="true">
        File
        <ul role="menu">
          <li role="menuitem">New</li>
          <li role="menuitem">Open</li>
          <li role="menuitem">Print</li>
        </ul>
      </li>
    </ul>
    `, {
    config: {
      ignoredTags: ["button"]
    },
    template: "<button><input></button>"
  }, {
    config: {
      ignoreTabindex: true
    },
    template: "<button><div tabindex=-1></div></button>"
  }, {
    config: {
      ignoreUsemapAttribute: true
    },
    template: '<button><img usemap=""></button>'
  }],
  bad: [{
    template: '<a href="/">button<a href="/">!</a></a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Do not use an <a> element with the \`href\` attribute inside an <a> element with the \`href\` attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<a href="/">button<button>!</button></a>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 37,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <button> inside an <a> element with the \`href\` attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button>button<a href="/">!</a></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 32,
              "endLine": 1,
              "line": 1,
              "message": "Do not use an <a> element with the \`href\` attribute inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<button>button<button>!</button></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <button> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button><input type="text"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 28,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <input> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<button><details><summary>Some details</summary><p>!</p></details></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 67,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <details> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button><embed type="video/quicktime" src="movie.mov" width="640" height="480"></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 80,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <embed> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button><iframe src="/frame.html" width="640" height="480"></iframe></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 69,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <iframe> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<button><select></select></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 26,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <select> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<button><textarea></textarea></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 30,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <textarea> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button><div tabindex="1"></div></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 33,
              "endLine": 1,
              "line": 1,
              "message": "Do not use an element with the \`tabindex\` attribute inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<button><img usemap=""></button>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 24,
              "endLine": 1,
              "line": 1,
              "message": "Do not use an <img> element with the \`usemap\` attribute inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: '<object usemap=""><button></button></object>',
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 19,
              "endColumn": 36,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <button> inside an <object> element with the \`usemap\` attribute",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    config: {
      additionalInteractiveTags: ["my-special-input"]
    },
    template: "<button><my-special-input></my-special-input></button>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 9,
              "endColumn": 46,
              "endLine": 1,
              "line": 1,
              "message": "Do not use <my-special-input> inside <button>",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<label><input><input></label>",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 15,
              "endColumn": 22,
              "endLine": 1,
              "line": 1,
              "message": "Do not use multiple interactive elements inside a single \`<label>\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: ['<label for="foo">', '  <div id="foo" tabindex=-1></div>', "  <input>", "</label>"].join("\n"),
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 3,
              "endColumn": 10,
              "endLine": 3,
              "line": 3,
              "message": "Do not use multiple interactive elements inside a single \`<label>\`",
              "nodeType": null,
              "ruleId": "ember-template-lint/no-nested-interactive",
              "severity": 2,
            },
          ]
        `);
    }
  }]
});