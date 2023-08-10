'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _nodeAssert = _interopRequireDefault(require('node:assert'));
var _createErrorMessage = _interopRequireDefault(require('../helpers/create-error-message.js'));
var _base = _interopRequireDefault(require('./_base.js'));
var tsLintPlugin = _interopRequireDefault(require('@typescript-eslint/eslint-plugin')).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 Forces valid indentation for blocks and their children.

 1. Forces block begin and block end statements to be at the same indentation
    level, when not on one line.

 ```hbs
 {{!-- good  --}}
 {{#each foo as |bar|}}
 {{/each}}

 <div>
   <p>{{t "greeting"}}</p>
 </div>

 {{!-- bad  --}}
 {{#each foo as |bar|}}
   {{/each}}

 <div>
  <p>{{t "greeting"}}</p>
  </div>
 ```

 2. Forces children of all blocks to start at a single indentation level deeper.
    Configuration is available to specify various indentation levels.


 ```
 {{!-- good  --}}
 <div>
   <p>{{t "greeting"}}</p>
 </div>

 {{!-- bad  --}}
 <div>
  <p>{{t "greeting"}}</p>
 </div>
 ```

 The following values are valid configuration:

 * boolean -- `true` indicates a 2 space indent, `false` indicates that the rule is disabled.
 * numeric -- the number of spaces to require for indentation
 * "tab" -- To indicate tab style indentation (1 char)
 * object --
 *    `indentation: <numeric>` - number of spaces to indent (defaults to 2)',
      `ignoreComments: <boolean>` - skip indentation for comments (defaults to `false`)',
 */

const VOID_TAGS = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
const IGNORED_ELEMENTS = new Set(['pre', 'script', 'style', 'textarea']);

const baseRule = tsLintPlugin.rules.indent;

class BlockIndentation extends _base.default {
  static meta = {
    type: 'layout',
    docs: {
      description: 'Enforce consistent indentation',
      // too opinionated to be recommended
      recommended: false,
      extendsBaseRule: true,
    },
    fixable: 'whitespace',
    hasSuggestions: baseRule.meta.hasSuggestions,
    messages: baseRule.meta.messages,
  };
  parseConfig(config) {
    let configType = typeof config;
    let defaultConfig = {
      indentation: 2
    };
    const editorIndentation = this.editorConfig['indent_size'];
    if (typeof editorIndentation === 'number') {
      defaultConfig.indentation = editorIndentation;
    }
    switch (configType) {
    case 'number':
    {
      return {
        indentation: config
      };
    }
    case 'boolean':
    {
      if (config) {
        return defaultConfig;
      } else {
        return {};
      }
    }
    case 'string':
    {
      if (config === 'tab') {
        return {
          indentation: 'tab'
        };
      }
      break;
    }
    case 'object':
    {
      let result = defaultConfig;
      if ('ignoreComments' in config) {
        let ignoreComments = config.ignoreComments;
        (0, _nodeAssert.default)(typeof ignoreComments === 'boolean', 'Unexpected value for ignoreComments. `ignoreComments` should be a boolean`');
        result.ignoreComments = ignoreComments;
      }
      if ('indentation' in config) {
        let indentation = config.indentation;
        (0, _nodeAssert.default)(typeof indentation === 'number', 'Unexpected value for indentation. `indentation` should be a number.');
        result.indentation = indentation;
      }
      return result;
    }
    case 'undefined':
    {
      return {};
    }
    }
    let errorMessage = (0, _createErrorMessage.default)(this.ruleName, ['  * boolean - `true` to enable 2 space indentation', '  * numeric - the number of spaces to require', '  * "tab" - usage of one character indentation (tab char)', '  * object - An object with the following keys:', '    * `indentation: <numeric>` - number of spaces to indent (defaults to 2)', '    * `ignoreComments: <boolean>` - skip comment indentation (defaults to `false`)'], config);
    throw new Error(errorMessage);
  }
  visitor() {
    const contextWithDefaults = Object.create(this.context, {
      options: {
        writable: false,
        configurable: false,
        value: [this.config.indentation]
      },
    });
    const rules = tsLintPlugin.rules['indent'].create(contextWithDefaults);
    function Program(node, type = 'Program') {
      const base = {
        type,
        // indent doesn't actually use these
        key: null,
        value: null,
        // Property flags
        computed: false,
        method: false,
        kind: 'init',
        // this will stop eslint from interrogating the type literal
        shorthand: true,
        // location data
        parent: node.parent,
        range: node.range,
        loc: node.loc,
      };
      return base;
    }

    function JSXElement(node) {
      let closingElement;
      if (node.type === 'GlimmerElementNode') {
        const end = `</${node.tag}>`;
        closingElement = {
          parent: node,
          range: [node.range[1] - end.length, node.range[1]],
          loc: {
            start: Object.assign({}, node.loc.start),
            end: Object.assign({}, node.loc.end),
          }
        };
        closingElement.loc.start.column = closingElement.loc.end.column - end.length - 1;
      }
      if (node.type === 'GlimmerBlockStatement') {
        const end = `{{/${node.path.original}}}`;
        closingElement = {
          parent: node,
          range: [node.range[1] - end.length, node.range[1]],
          loc: {
            start: Object.assign({}, node.loc.start),
            end: Object.assign({}, node.loc.end),
          }
        };
        closingElement.loc.start.column = closingElement.loc.end.column - end.length - 1;
      }
      return {
        type: 'JSXElement',
        openingElement: {
          parent: node,
          range: node.range,
          loc: node.loc,
        },
        closingElement,
        children: node.children || node.body,
        parent: node.parent,
        range: node.range,
        loc: node.loc,
      };
    }

    let ignoredStack = [];

    return Object.assign({}, rules, {
      // overwrite the base rule here so we can use our KNOWN_NODES list instead
      '*:exit'(node) {
        // For nodes we care about, skip the default handling, because it just marks the node as ignored...
        if (!node.type.startsWith('Glimmer') || ignoredStack.includes(node) && !IGNORED_ELEMENTS.has(node.tag)) {
          rules['*:exit'](node);
        }
        ignoredStack.pop();
      },
      'GlimmerTemplate:exit'(node) {
        if (!node.parent) {
          rules['Program:exit'](node);
        }
      },
      '*'(node) {
        if (ignoredStack.length) {
          ignoredStack.push(node);
        }
      },
      GlimmerElementNode(node) {
        if (ignoredStack.length) return;
        if (IGNORED_ELEMENTS.has(node.tag)) {
          ignoredStack.push(node);
          return;
        }
        if (node.selfClosing) {
          return;
        }
        return rules['JSXElement'](JSXElement(node));
      },
      GlimmerTemplate(node) {
        if (!node.parent) return;
        return rules['JSXElement'](JSXElement({ ...node, tag: 'template', type: 'GlimmerElementNode' }));
      },
      GlimmerBlockStatement(node) {
        if (ignoredStack.length) {
          ignoredStack.push(node);
          return;
        }
        const body = node.program.body.concat(node.inverse?.body || []);
        return rules['JSXElement'](JSXElement({ ...node, body }));
      }
    });
  }
}
exports.default = BlockIndentation;