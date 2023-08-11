"use strict";

var _noImplicitThis = require("../../../lib/rules/no-implicit-this.js");
var _ruleTestHarness = _interopRequireDefault(require("../../helpers/rule-test-harness.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let statements = [path => `{{${path}}}`, path => `{{${path} argument=true}}`, path => `{{#${path}}}{{/${path}}}`, path => `{{helper argument=${path}}}`, path => `{{#helper argument=${path}}}{{/helper}}`, path => `{{echo (helper ${path})}}`, path => `<div {{helper ${path}}}></div>`];
let builtins = _noImplicitThis.ARGLESS_BUILTIN_HELPERS.reduce((accumulator, helper) => {
  return [...accumulator, `{{${helper}}}`, `{{"inline: " (${helper})}}`];
}, []);
let good = [...builtins, "{{welcome-page}}", "<WelcomePage />", '<MyComponent @prop={{can "edit" @model}} />', {
  config: {
    allow: ["book-details"]
  },
  template: "{{book-details}}"
}, {
  config: {
    allow: [/^data-test-.+/]
  },
  template: "{{foo-bar data-test-foo}}"
}, {
  template: `import { hbs } from 'ember-cli-htmlbars';
      import { setComponentTemplate } from '@ember/component';
      import templateOnly from '@ember/component/template-only';
      export const SomeComponent = setComponentTemplate(hbs\`{{book}}\`, templateOnly());`,
  meta: {
    filePath: "layout.gjs"
  }
}, {
  template: `import { hbs } from 'ember-cli-htmlbars';
      import { setComponentTemplate } from '@ember/component';
      import templateOnly from '@ember/component/template-only';
      export const SomeComponent = setComponentTemplate(hbs\`{{book}}\`, templateOnly());`,
  meta: {
    filePath: "layout.gts"
  }
}, {
  config: {
    isStrictMode: false
  },
  template: `import { hbs } from 'ember-cli-htmlbars';
      import { setComponentTemplate } from '@ember/component';
      import templateOnly from '@ember/component/template-only';
      export const SomeComponent = setComponentTemplate(hbs\`{{book}}\`, templateOnly());`,
  meta: {
    filePath: "layout.js"
  }
}, {
  template: `import { hbs } from 'ember-cli-htmlbars';
      import { setComponentTemplate } from '@ember/component';
      import templateOnly from '@ember/component/template-only';
      export const SomeComponent = setComponentTemplate(hbs\`{{book}}\`, templateOnly());`,
  meta: {
    filePath: "layout.ts"
  }
}];
for (const statement of statements) {
  good.push(`${statement("@book")}`, `${statement("@book.author")}`, `${statement("this.book")}`, `${statement("this.book.author")}`, `{{#books as |book|}}${statement("book")}{{/books}}`, `{{#books as |book|}}${statement("book.author")}{{/books}}`);
}
(0, _ruleTestHarness.default)({
  name: "no-implicit-this",
  config: true,
  good,
  bad: [{
    template: "{{book}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{book-details}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{book.author}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{helper book}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{#helper book}}{{/helper}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent @prop={{can.do}} />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent @prop={{can.do}} />",
    config: {
      allow: ["can"]
    },
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "{{session.user.name}}",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<MyComponent @prop={{session.user.name}} />",
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "fatal": true,
              "filePath": "layout.hbs",
              "message": "Cannot read properties of undefined (reading 'some')
          Occurred while linting C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.hbs:1
          Rule: "ember-template-lint/no-implicit-this"",
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    template: "<template>{{book}}</template>",
    meta: {
      filePath: "layout.gjs"
    },
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": undefined,
              "fatal": true,
              "line": undefined,
              "message": "Parsing error: No Babel config file detected for C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.gjs. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.",
              "nodeType": null,
              "ruleId": null,
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    meta: {
      filePath: "layout.gjs"
    },
    template: `import { hbs } from 'ember-template-imports';
      import { setComponentTemplate } from '@ember/component';
      import templateOnly from '@ember/component/template-only';
      export const SomeComponent = setComponentTemplate(hbs\`{{book}}\`, templateOnly());`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": undefined,
              "fatal": true,
              "line": undefined,
              "message": "Parsing error: No Babel config file detected for C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.gjs. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.",
              "nodeType": null,
              "ruleId": null,
              "severity": 2,
            },
          ]
        `);
    }
  }, {
    meta: {
      filePath: "layout.gjs"
    },
    template: `import { hbs as theHbs } from 'ember-template-imports';
      import { setComponentTemplate } from '@ember/component';
      import templateOnly from '@ember/component/template-only';
      export const SomeComponent = setComponentTemplate(theHbs\`{{book}}\`, templateOnly());`,
    verifyResults(results) {
      expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": undefined,
              "fatal": true,
              "line": undefined,
              "message": "Parsing error: No Babel config file detected for C:\\Users\\patrick\\IdeaProjects\\eslint-plugin-hbs\\layout.gjs. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.",
              "nodeType": null,
              "ruleId": null,
              "severity": 2,
            },
          ]
        `);
    }
  }]
});