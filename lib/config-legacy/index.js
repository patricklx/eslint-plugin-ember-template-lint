const info = require('../ember-template-lint/info');
const base = require('./base');

const configs = {};

Object.entries(info.configs).forEach(([name, config]) => {
  Object.entries(config.rules).forEach(([name, conf]) => {
    if (typeof conf == 'boolean') {
      config.rules[name] = [conf ? 'error' : 'off'];
    }
  });
  configs[name] = {...base, rules: config.rules};
});
configs['config'] = {
  ...base,
  rules: info.configuredRules,
  overrides: info.configuredOverrides,
};

module.exports = configs;

