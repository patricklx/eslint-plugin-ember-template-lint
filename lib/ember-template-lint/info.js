const synckit = require('synckit');
const syncFn = synckit.createSyncFn(require.resolve('./worker'));
const { runTemplateLint } = require('../rules/lint');
const { registerRule, templateLintConfig } = require('../ember-template-lint/config');

const lintWithEslintConfigs = syncFn({ config: templateLintConfig });
const lintConfigs = syncFn();

const activeRules = new Map();
const allMessages = {};

const reporter = {
  setup(context) {
    this.getSourceCode = context.getSourceCode;
    this.getPhysicalFilename = context.getPhysicalFilename;
  },
  report(message) {
    message.meta = {
      fixable: 'code'
    };
    allMessages[message.rule] = allMessages[message.rule] || [];
    allMessages[message.rule].push(message);
  }
};

class Rule {

  constructor(name) {
    this.create = this.create.bind(this);
    this.name = name;
    this.meta = {
      fixable: 'code'
    };
  }
  create(context) {
    const rule = this;
    let options = context.options;
    if (options.length === 0) {
      options = true;
    }
    registerRule(this.name, options);
    const visitor = {
      enter(node) {
        if (!activeRules.get(node)) {
          activeRules.set(node, 0);
          reporter.setup(context);
          runTemplateLint(node, reporter);
        }
        activeRules.set(node, activeRules.get(node) + 1);
      },
      exit(node) {
        const messages = allMessages[rule.name] || [];
        messages.forEach(m => context.report(m));
        activeRules.set(node, activeRules.get(node) - 1);
        allMessages[rule.name] = [];
      },
    };
    return {
      'Program': (node) => node.isHbs && visitor.enter(node),
      'Program:exit': (node) => node.isHbs && visitor.exit(node),
      'GlimmerTemplate': visitor.enter,
      'GlimmerTemplate:exit': visitor.exit,
    };
  }
}

function createRules(rules) {
  const created = rules.map(r => new Rule(r));
  const map = {};
  created.forEach(r => {
    map[r.name] = r;
  });
  return map;
}

const configs = {
  ...lintWithEslintConfigs.configs,
  ...lintConfigs.configs
};

const rules = [...new Set([...lintConfigs.rules, ...lintWithEslintConfigs.rules])];

delete configs.recommended.overrides;

Object.values(configs).forEach((config) => {
  const rules = {};
  Object.entries(config.rules).forEach(([rule, conf]) => {
    rules['ember-template-lint/' + rule] = conf;
  });
  config.rules = rules;
});

// enable all rules
const configuredRules = {};

for (const rule of rules) {
  configuredRules['ember-template-lint/' + rule] = [];
  configuredRules['ember-template-lint/' + rule].push(2);
  configuredRules['ember-template-lint/' + rule].push({ __placeholder__: true });
}

Object.entries(lintConfigs.configuredRules).forEach(([name, conf]) => {
  configuredRules['ember-template-lint/' + name] = [];
  configuredRules['ember-template-lint/' + name].push(conf.severity);
  if (typeof conf.config !== 'boolean') {
    configuredRules['ember-template-lint/' + name].push(conf.config);
  }
});

const configuredOverrides = [];

for (const configuredOverride of lintConfigs.configuredOverrides) {
  const configuredRules = {};
  Object.entries(configuredOverride.rules).forEach(([name, conf]) => {
    configuredRules['ember-template-lint/' + name] = [];
    configuredRules['ember-template-lint/' + name].push(conf.severity);
    if (typeof conf.config !== 'boolean') {
      configuredRules['ember-template-lint/' + name].push(conf.config);
    }
  });
  configuredOverrides.push({
    files: configuredOverride.files,
    rules: configuredRules
  });
}


module.exports = {
  configs: configs,
  rules: createRules(rules),
  configuredRules,
  configuredOverrides
};
