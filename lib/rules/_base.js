Object.defineProperty(exports, "__esModule", {
  value: true
});

const reLines = /(.*?(?:\r\n?|\n|$))/gm;
const MODULE_NAME = Symbol('_moduleName');

class BaseRule {
  constructor(options) {
    this.ruleName = options.name;
    this._configResolver = options.configResolver;
    this.results = [];
    this.mode = options.shouldFix ? 'fix' : 'report';
    this.isStrictMode = options.isStrictMode;
    this.workingDir = options.workingDir;
    // TODO: add a deprecation for accessing _filePath
    this.filePath = this._filePath = options.filePath;
    // To support DOM-scoped configuration instructions, we need to maintain
    // a stack of our configurations so we can restore the previous one when
    // the current one goes out of scope. The current one is duplicated in
    // this.config so the rule implementations don't need to worry about the
    // fact that there is a stack.
    this[MODULE_NAME] = options.moduleName;
    this._rawSource = options.rawSource;
    this.columnOffset = options.columnOffset;
    this.source = options.rawSource.match(reLines);
    this.scope = options.scope;
    this.context = options.context;
  }
  get editorConfig() {
    return this._configResolver.editorConfig();
  }
  get _moduleName() {
    throw new Error(`The \`_moduleName\` property used in the '${this.ruleName}' rule has been removed. Please use \`_filePath\` instead.`);
  }

  parseConfig(config) {
    return config ?? true;
  }

  get config() {
    return this.parseConfig(this.context.options[0]);
  }

  getVisitor() {
    const visitor = this.visitor();
    if (!visitor) return {};
    function createPath(node) {
      const path = {
        node,
        parentNode: node.parent,
        get parent() {
          return node.parent && createPath(node.parent);
        },
        parents() {
          const p = [];
          let parent = node.parent;
          while (parent) {
            p.push({ node: parent });
            parent = parent.parent;
          }
          return p;
        }
      };
      return path;
    }
    for (const name in visitor) {
      if (typeof visitor[name] === 'function') {
        const fn = visitor[name];
        visitor[name] = (node) => {
          return fn.call(this, node, createPath(node));
        };
      }
      if (visitor[name].exit) {
        const exit = visitor[name].exit;
        visitor[`${name}:exit`] = (node) => {
          return exit.call(this, node, createPath(node));
        };
        delete visitor[name].exit;
      }
      if (visitor[name].enter) {
        const enter = visitor[name].enter;
        visitor[`${name}`] = (node) => {
          return enter.call(this, node, createPath(node));
        };
      }
      if (typeof visitor[name] !== 'function') {
        delete visitor[name];
      }
    }
    const GlimmerTemplate = visitor.GlimmerTemplate;
    visitor.GlimmerTemplate = function (node) {
      this.isStrictMode = node.parent !== null;
      this.columnOffset = 0;
      if (this.isStrictMode) {
        const line = this.context.getSourceCode().getLines()[node.parent.loc.start.line - 1];
        const whitespace = line.search(/\S/);
        this.columnOffset = whitespace;
      }
      GlimmerTemplate?.call(this, node);
    }.bind(this);
    return visitor;
  }

  visitor() {}

  isDisabled() {
    return !this.config;
  }
  log(result) {
    let nodeProps = {};
    let defaults = {
      rule: this.ruleName,
      severity: this.severity
    };
    const REQUIRED_LOC_PROPERTIES = ['line', 'column', 'endLine', 'endColumn'];
    let hasAllLocProps = REQUIRED_LOC_PROPERTIES.every(prop => prop in result);
    if (this.filePath) {
      defaults.filePath = this.filePath;
    }
    if (!result.message) {
      throw new Error(`ember-template-lint: (${this.ruleName}): must provide violation \`message\` when calling log.`);
    }
    if (!result.node && !hasAllLocProps) {
      throw new Error(`ember-template-lint: (${this.ruleName}) Must pass the node or all loc properties (${REQUIRED_LOC_PROPERTIES.join(', ')}) when calling log.`);
    }

    // perform the node property expansion only if those properties don't exist in result
    if (!hasAllLocProps && result.node) {
      let node = result.node;
      delete result.node;
      // if we've passed node, we want to ensure that we're correctly expanding the properties
      // to include line, column, and source. If the rule has passed custom values for these,
      // we want to respect those.
      nodeProps = {
        line: 'line' in result ? result.line : node.loc && node.loc.start.line,
        column: 'column' in result ? result.column : node.loc && node.loc.start.column,
        endLine: 'endLine' in result ? result.endLine : node.loc && node.loc.end.line,
        endColumn: 'endColumn' in result ? result.endColumn : node.loc && node.loc.end.column,
        source: 'source' in result ? result.source : this.sourceForNode(node)
      };
    }
    let reportedResult = Object.assign({}, defaults, nodeProps, result);
    this.context.report({
      message: reportedResult.message,
      node: result.node,
      fix: result.fix,
      loc: result.node ? null : {
        start: {
          line: reportedResult.line,
          column: reportedResult.column,
        },
        end: {
          line: reportedResult.endLine,
          column: reportedResult.endColumn,
        }
      }
    });
  }
  detect() {
    throw new Error('Must implemented #detect');
  }
  process() {
    throw new Error('Must implemented #process');
  }

  // mostly copy/pasta from tildeio/htmlbars with a few tweaks:
  // https://github.com/tildeio/htmlbars/blob/v0.14.17/packages/htmlbars-syntax/lib/parser.js#L59-L90
  sourceForNode(node) {
    if (node.loc) {
      return this.sourceForLoc(node.loc);
    }
  }
  sourceForLoc(loc) {
    let firstLine = loc.start.line - 1;
    let lastLine = loc.end.line - 1;
    let currentLine = firstLine - 1;
    let firstColumn = loc.start.column;
    let lastColumn = loc.end.column;
    let string = [];
    let line;
    while (currentLine < lastLine) {
      currentLine++;
      line = this.source[currentLine];
      if (currentLine === firstLine) {
        if (firstLine === lastLine) {
          string.push(line.slice(firstColumn, lastColumn));
        } else {
          string.push(line.slice(firstColumn));
        }
      } else if (currentLine === lastLine) {
        string.push(line.slice(0, lastColumn));
      } else {
        string.push(line);
      }
    }
    return string.join('');
  }
  isLocal(node) {
    return this.scope.isLocal(node);
  }
}
exports.default = BaseRule;
module.exports = exports.default;