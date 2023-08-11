"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const _base = require('./_base.js');
const createErrorMessage = require('../helpers/create-error-message').default;
const tsLintPlugin = require('@typescript-eslint/eslint-plugin')

const baseRule = tsLintPlugin.rules.quotes;

class Quotes extends _base {
  static meta = {
    type: 'layout',
    docs: {
      description: 'Enforce the consistent use of either double or single quotes',
      // too opinionated to be recommended
      recommended: false,
      extendsBaseRule: true,
    },
    fixable: 'code',
    hasSuggestions: baseRule.meta.hasSuggestions,
    messages: {
      both: 'you must use {{description}} in templates',
      html: 'you must use {{description}} in HTML attributes',
      curlies: 'you must use {{description}} in Handlebars syntax',
    },
  };

  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
    case 'boolean': {
      if (!config) {
        return false;
      }
      break;
    }
    case 'string': {
      if (['double', 'single'].includes(config)) {
        return {
          curlies: config,
          html: config,
        };
      }
      break;
    }
    case 'object': {
      if (
        Object.keys(config).length === 2 &&
        ['double', 'single', false].includes(config.curlies) &&
        ['double', 'single', false].includes(config.html)
      ) {
        if (!config.curlies && !config.html) {
          return false;
        }
        return config;
      }
      break;
    }
    case 'undefined': {
      return false;
    }
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * "double" - requires the use of double quotes wherever possible',
        '  * "single" - requires the use of single quotes wherever possible',
        '  * { curlies: "single"|"double"|false, html: "single"|"double"|false } - requires different quotes for Handlebars and HTML syntax',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {

    const htmlContext= Object.create(this.context, {
      options: {
        writable: false,
        configurable: false,
        value: [this.config.html]
      },
      report: {
        value: (report) => {
          report.messageId = this.config.html === this.config.curlies ? 'both' : 'html';
          this.context.report(report);
        },
      }
    });
    const curliesContext= Object.create(this.context, {
      options: {
        writable: false,
        configurable: false,
        value: [this.config.curlies]
      },
      report: {
        value: (report) => {
          report.messageId = this.config.html === this.config.curlies ? 'both' : 'curlies';
          this.context.report(report);
        },
      }
    });
    const rules = {
      html: baseRule.create(htmlContext),
      curlies: baseRule.create(curliesContext),
    };
    return Object.assign({}, {
      GlimmerAttrNode(node) {
        if (!node.value) return;
        if (!this.config) return;
        if (this.config.html === false) return ;
        const raw = this.context.getSourceCode().text.slice(...node.value.range);
        const value = raw.slice(1,-1);
        return rules.html.Literal({ ...node.value, value, raw });
      },
      GlimmerStringLiteral(node) {
        if (!this.config) return;
        if (this.config.curlies === false) return ;
        const raw = this.context.getSourceCode().text.slice(...node.range);
        return rules.curlies.Literal({ ...node, raw });
      }
    });
  }
}
exports.default = Quotes;
module.exports = exports.default;
