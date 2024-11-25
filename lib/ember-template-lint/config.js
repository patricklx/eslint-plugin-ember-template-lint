const templateLintConfig = {
  rules: {},
  plugins: [],
};

function registerRule(name, config) {
  templateLintConfig.rules[name] = Array.isArray(config) ? config[0] : config;
}

function registerPlugin(name) {
  templateLintConfig.plugins.push(name);
}

module.exports = {
  registerRule,
  registerPlugin,
  templateLintConfig
};