const EditorConfigResolver = require('./get-editor-config').default;
const rules = require('./rules');
const eslintRules = {};

class EslintRule {
  constructor(name, Rule) {
    this.create = this.create.bind(this);
    this.Rule = Rule;
    this.name = name;
    this.meta = Rule.meta;
  }
  create(context) {
    const editorConfigResolver = new EditorConfigResolver(context.cwd);
    editorConfigResolver.resolveEditorConfigFiles();
    let options = context.options[0];
    if (options === undefined) {
      options = true;
    }
    const lintOptions = {
      config: options,
      name: this.name,
      rawSource: context.getSourceCode().text,
      filePath: context.filename,
      configResolver: Object.assign(
        {
          editorConfig: () => {
            if (!options.filePath) {
              return {};
            }

            return editorConfigResolver.getEditorConfigData(options.filePath);
          },
        },
        options.configResolver
      ),
      context,
      scope: {
        isLocal(name) {
          let scope = context.getScope();

          while (scope) {
            const variable = scope.set.get(name);

            if (variable) {
              return variable;
            }

            scope = scope.upper;
          }

          return null;
        }
      }
    };
    const rule = new this.Rule(lintOptions);
    return rule.getVisitor(context);
  }
}



Object.entries(rules).forEach(([name, Rule]) => {
  eslintRules[name] = new EslintRule(name, Rule);
});


module.exports = eslintRules;