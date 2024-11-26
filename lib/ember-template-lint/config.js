const templateLintConfig = {
  rules: {},
  plugins: [],
  overrides: [],
};

let current = templateLintConfig;

function registerRule(name, config) {
  current.rules[name] = Array.isArray(config) ? config[0] : config;
}

function registerPlugin(name) {
  current.plugins.push(name);
}

function startOverride(files) {
  current = {
    files,
    rules: {}
  };
  templateLintConfig.overrides.push(current);
}

function finishOverride() {
  current = templateLintConfig;
}

module.exports = {
  registerRule,
  registerPlugin,
  startOverride,
  finishOverride,
  templateLintConfig
};
