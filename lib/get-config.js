"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectConfig = void 0;
exports.getRuleFromString = getRuleFromString;
exports.processRules = processRules;
exports.resolveProjectConfig = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
var _findUp = require("find-up");
var _micromatch = _interopRequireDefault(require("micromatch"));
var _nodeModule = require("node:module");
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeUrl = require("node:url");
var _resolve = _interopRequireDefault(require("resolve"));
var _index = _interopRequireDefault(require("./config/index.js"));
var _deprecatedRules = _interopRequireDefault(require("./helpers/deprecated-rules.js"));
var _determineRuleConfig = _interopRequireDefault(require("./helpers/determine-rule-config.js"));
var _index2 = _interopRequireDefault(require("./rules/index.js"));
function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function _invoke(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
function _empty() {}
function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}
function _settle(pact, state, value) {
  if (!pact.s) {
    if (value instanceof _Pact) {
      if (value.s) {
        if (state & 1) {
          state = value.s;
        }
        value = value.v;
      } else {
        value.o = _settle.bind(null, pact, state);
        return;
      }
    }
    if (value && value.then) {
      value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
      return;
    }
    pact.s = state;
    pact.v = value;
    const observer = pact.o;
    if (observer) {
      observer(pact);
    }
  }
}
const _Pact = /*#__PURE__*/function () {
  function _Pact() {}
  _Pact.prototype.then = function (onFulfilled, onRejected) {
    const result = new _Pact();
    const state = this.s;
    if (state) {
      const callback = state & 1 ? onFulfilled : onRejected;
      if (callback) {
        try {
          _settle(result, 1, callback(this.v));
        } catch (e) {
          _settle(result, 2, e);
        }
        return result;
      } else {
        return this;
      }
    }
    this.o = function (_this) {
      try {
        const value = _this.v;
        if (_this.s & 1) {
          _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle(result, 1, onRejected(value));
        } else {
          _settle(result, 2, value);
        }
      } catch (e) {
        _settle(result, 2, e);
      }
    };
    return result;
  };
  return _Pact;
}();
function _isSettledPact(thenable) {
  return thenable instanceof _Pact && thenable.s & 1;
}
function _forTo(array, body, check) {
  var i = -1,
    pact,
    reject;
  function _cycle(result) {
    try {
      while (++i < array.length && (!check || !check())) {
        result = body(i);
        if (result && result.then) {
          if (_isSettledPact(result)) {
            result = result.v;
          } else {
            result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
            return;
          }
        }
      }
      if (pact) {
        _settle(pact, 1, result);
      } else {
        pact = result;
      }
    } catch (e) {
      _settle(pact || (pact = new _Pact()), 2, e);
    }
  }
  _cycle();
  return pact;
}
function _forIn(target, body, check) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return _forTo(keys, function (i) {
    return body(keys[i]);
  }, check);
}
function _continueIgnored(value) {
  if (value && value.then) {
    return value.then(_empty);
  }
}
const _iteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
function _forOf(target, body, check) {
  if (typeof target[_iteratorSymbol] === "function") {
    var iterator = target[_iteratorSymbol](),
      step,
      pact,
      reject;
    function _cycle(result) {
      try {
        while (!(step = iterator.next()).done && (!check || !check())) {
          result = body(step.value);
          if (result && result.then) {
            if (_isSettledPact(result)) {
              result = result.v;
            } else {
              result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
              return;
            }
          }
        }
        if (pact) {
          _settle(pact, 1, result);
        } else {
          pact = result;
        }
      } catch (e) {
        _settle(pact || (pact = new _Pact()), 2, e);
      }
    }
    _cycle();
    if (iterator.return) {
      var _fixup = function (value) {
        try {
          if (!step.done) {
            iterator.return();
          }
        } catch (e) {}
        return value;
      };
      if (pact && pact.then) {
        return pact.then(_fixup, function (e) {
          throw _fixup(e);
        });
      }
      _fixup();
    }
    return pact;
  }
  // No support for Symbol.iterator
  if (!("length" in target)) {
    throw new TypeError("Object is not iterable");
  }
  // Handle live collections properly
  var values = [];
  for (var i = 0; i < target.length; i++) {
    values.push(target[i]);
  }
  return _forTo(values, function (i) {
    return body(values[i]);
  }, check);
}
function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getProjectConfig = _async(function (workingDir, options) {
  let _options$config = options.config;
  return _await(_options$config || resolveProjectConfig(workingDir, options), function (source) {
    let config;
    return _invoke(function () {
      if (source._processed) {
        config = source;
      } else {
        // don't mutate a `require`d object, you'll have a bad time
        config = {};
        ensureRootProperties(config, source);
        validateRootProperties(source);
        return _await(processPlugins(workingDir, source.plugins, options), function (_processPlugins) {
          config.plugins = _processPlugins;
          return _await(processLoadedRules(workingDir, config, options), function (_processLoadedRules) {
            config.loadedRules = _processLoadedRules;
            return _await(processLoadedConfigurations(workingDir, config, options), function (_processLoadedConfigu) {
              config.loadedConfigurations = _processLoadedConfigu;
              processExtends(config);
              processIgnores(config);
              validateRules(config.rules, config.loadedRules, options);
              validateOverrides(config, options);
              validateFormat(config);
              config.rules = processRules(config);
              config._processed = true;
            });
          });
        });
      }
    }, function () {
      return config;
    });
  }, _options$config);
});
exports.getProjectConfig = getProjectConfig;
const processLoadedConfigurations = _async(function (workingDir, config, options) {
  let loadedConfigurations;
  if (config.loadedConfigurations) {
    loadedConfigurations = config.loadedConfigurations;
  } else {
    // load all the default configurations in `ember-template-lint`
    loadedConfigurations = Object.assign({}, _index.default);
  }
  return _await(forEachPluginConfiguration(config.plugins, _async(function (configuration, configurationName, pluginName) {
    let name = `${pluginName}:${configurationName}`;
    loadedConfigurations[name] = configuration;

    // load plugins recursively
    return _await(processPlugins(workingDir, configuration.plugins, options, config.plugins), function (plugins) {
      return _awaitIgnored(processLoadedConfigurations(workingDir, {
        plugins,
        loadedConfigurations
      }, options));
    });
  })), function () {
    return loadedConfigurations;
  });
});
const processLoadedRules = _async(function (workingDir, config, options) {
  let loadedRules;
  if (config.loadedRules) {
    loadedRules = config.loadedRules;
  } else {
    // load all the default rules in `ember-template-lint`
    loadedRules = Object.assign({}, _index2.default);
  }

  // load plugin rules
  for (let pluginName in config.plugins) {
    let pluginRules = config.plugins[pluginName].rules;
    if (pluginRules) {
      loadedRules = Object.assign(loadedRules, pluginRules);
    }
  }
  return _await(forEachPluginConfiguration(config.plugins, _async(function (configuration) {
    return _await(processPlugins(workingDir, configuration.plugins, options, config.plugins), function (plugins) {
      // process plugins recursively
      return _awaitIgnored(processLoadedRules(workingDir, {
        plugins,
        loadedRules
      }));
    });
  })), function () {
    return loadedRules;
  });
});
const processPlugins = _async(function (workingDir, plugins = [], options, checkForCircularReference) {
  let _exit = false;
  let pluginsHash = {};
  return _continue(_forOf(plugins, function (plugin) {
    let pluginName;
    return _invoke(function () {
      if (typeof plugin === 'string') {
        pluginName = plugin;
        // the second argument here should actually be the config file path for
        // the _currently being processed_ config file (not neccesarily the one
        // specified to the bin script)
        return _await(requirePlugin(workingDir, pluginName, options.resolvedConfigPath), function (_requirePlugin) {
          plugin = _requirePlugin;
        });
      }
    }, function () {
      let errorMessage;
      if (typeof plugin === 'object') {
        if (plugin.name) {
          if (!checkForCircularReference || !checkForCircularReference[plugin.name]) {
            pluginsHash[plugin.name] = plugin;
          }
        } else if (pluginName) {
          errorMessage = `Plugin (${pluginName}) has not defined the plugin \`name\` property`;
        } else {
          errorMessage = 'Inline plugin object has not defined the plugin `name` property';
        }
      } else if (pluginName) {
        errorMessage = `Plugin (${pluginName}) did not return a plain object`;
      } else {
        errorMessage = 'Inline plugin is not a plain object';
      }
      if (errorMessage) {
        throw new Error(errorMessage);
      }
    });
  }, function () {
    return _exit;
  }), function (_result) {
    return _exit ? _result : _await(forEachPluginConfiguration(pluginsHash, _async(function (configuration) {
      // process plugins recursively
      return _await(processPlugins(workingDir, configuration.plugins, options, pluginsHash), function (_processPlugins2) {
        Object.assign(pluginsHash, _processPlugins2);
      });
    })), function () {
      return pluginsHash;
    });
  });
});
const forEachPluginConfiguration = _async(function (plugins, callback) {
  if (!plugins) {
    return;
  }
  return _continueIgnored(_forIn(plugins, function (pluginName) {
    let pluginConfigurations = plugins[pluginName].configurations;
    if (!pluginConfigurations) {
      return;
    }
    return _continueIgnored(_forIn(pluginConfigurations, function (configurationName) {
      let configuration = pluginConfigurations[configurationName];
      return _awaitIgnored(callback(configuration, configurationName, pluginName));
    }));
  }));
});
const resolveProjectConfig = _async(function (workingDir, options) {
  let configPath;
  if (options.configPath) {
    configPath = _nodePath.default.resolve(workingDir, options.configPath);
    try {
      // Making sure that the filePath exists, before requiring it directly this is
      // needed in order to ensure that we only squelch module missing errors for
      // the config path itself (and not other files that the config path may
      // require itself)
      require.resolve(configPath);
    } catch (error) {
      let isModuleMissingError = ALLOWED_ERROR_CODES.has(error.code);
      if (!isModuleMissingError) {
        throw error;
      }
      throw new Error(`The configuration file specified (${options.configPath}) could not be found. Aborting.`);
    }
  } else if (options.configPath === false) {
    // we are explicitly using `--no-config-path` flag
    return {};
  } else {
    // look for our config file relative to the specified working directory
    configPath = (0, _findUp.findUpSync)(CONFIG_FILE_NAME, {
      cwd: workingDir
    });
    if (configPath === undefined) {
      // we weren't given an explicit --config-path argument, and we couldn't
      // find a relative .template-lintrc.js file, just use the default "empty" config
      return {};
    }
  }
  options.resolvedConfigPath = configPath;
  return _catch(function () {
    return _await(require((0, _nodeUrl.pathToFileURL)(configPath)), function ({
      default: config
    }) {
      return config;
    });
  }, function (error) {
    // Fallback to ensure we can load CJS configs in Node versions before 16 (TODO: remove eventually).
    return requireFallback(configPath, error);
  });
});
/**
 * Attempts to require a module using `require()` this is used as a fallback
 * for when `import()` fails to load a module. This is needed to support loading
 * CJS modules in legacy Node versions. If the module is ESM, then a ERR_REQUIRE_ESM
 * error will be throw by `require`, in that case the original import error must be thrown.
 *
 * @todo remove this fallback once we drop support for Node 14
 * @param {string} requirePath path of module to require
 * @param {Error} importError error thrown by import()
 * @throws {Error} error thrown by require() or importError if the module is ESM
 */
exports.resolveProjectConfig = resolveProjectConfig;
const requirePlugin = _async(function (workingDir, pluginName, fromConfigPath) {
  let basedir = fromConfigPath === undefined ? workingDir : _nodePath.default.dirname(fromConfigPath);

  // throws exception if not found
  let pluginPath = _resolve.default.sync(pluginName, {
    basedir,
    extensions: ['.js', '.mjs', '.cjs']
  });
  return _catch(function () {
    let pluginURL = (0, _nodeUrl.pathToFileURL)(pluginPath);
    return _await(require(pluginURL), function ({
      default: plugin
    }) {
      return plugin;
    });
  }, function (error) {
    // Fallback to ensure we can load CJS plugins in Node versions before 16 (TODO: remove eventually).
    return requireFallback(pluginPath, error);
  });
});
const KNOWN_ROOT_PROPERTIES = new Set(['extends', 'rules', 'ignore', 'plugins', 'overrides', 'format']);
const SUPPORTED_OVERRIDE_KEYS = new Set(['files', 'rules']);
const SUPPORTED_FORMAT_PROPS = new Set(['name', 'outputFile']);
const CONFIG_FILE_NAME = '.template-lintrc.js';
const ALLOWED_ERROR_CODES = new Set([
// resolve package error codes
'MODULE_NOT_FOUND',
// Yarn PnP Error Code
'QUALIFIED_PATH_RESOLUTION_FAILED']);
function requireFallback(requirePath, importError) {
  try {
    return require(requirePath); // eslint-disable-line import/no-dynamic-require
  } catch (error) {
    if (importError && error.code === 'ERR_REQUIRE_ESM') {
      // if the module is ESM, throw the original import error
      throw importError;
    }
    throw error;
  }
}
function normalizeExtends(config) {
  let extendedList = [];
  if (config.extends) {
    if (typeof config.extends === 'string') {
      extendedList = [config.extends];
    } else if (Array.isArray(config.extends)) {
      extendedList = [...config.extends];
    } else {
      throw new TypeError('config.extends should be string or array');
    }
  }
  return extendedList;
}
function ensureRootProperties(config, source) {
  config.rules = Object.assign({}, source.rules || {});
  config.overrides = [...(source.overrides || [])];
  config.ignore = [...(source.ignore || [])];
  config.extends = source.extends;
  config.format = Object.assign({}, source.format || {});
}
function validateRootProperties(source) {
  for (let key in source) {
    if (!KNOWN_ROOT_PROPERTIES.has(key)) {
      throw new Error(`Unknown top-level configuration property detected: ${key}`);
    }
  }
}
function processExtends(config) {
  let extendedList = normalizeExtends(config);
  let extendedRules = {};
  let extendedOverrides = [];
  if (extendedList) {
    for (const extendName of extendedList) {
      let configuration = config.loadedConfigurations[extendName];
      if (configuration) {
        // ignore loops
        if (!configuration.loadedConfigurations) {
          configuration.loadedConfigurations = config.loadedConfigurations;

          // continue chaining `extends` from plugins until done
          processExtends(configuration);
          delete configuration.loadedConfigurations;
          if (configuration.overrides) {
            extendedOverrides = [...extendedOverrides, ...configuration.overrides];
          }
          if (configuration.rules) {
            extendedRules = Object.assign({}, extendedRules, configuration.rules);
          } else {
            throw new Error(`Missing rules for extends: ${extendName}`);
          }
        }
      } else {
        throw new Error(`Cannot find configuration for extends: ${extendName}`);
      }
      delete config.extends;
    }
    config.rules = Object.assign({}, extendedRules, config.rules);
    config.overrides = [...extendedOverrides, ...(config.overrides || [])];
  }
}
function processIgnores(config) {
  config.ignore = config.ignore.map(pattern => _micromatch.default.matcher(pattern));
}

/**
 * we were passed a rule, add the rule being passed in, to the config.
 * ex:
 * rule:severity
 * no-implicit-this:["error", { "allow": ["some-helper"] }]
 */
function getRuleFromString(rule) {
  const indexOfSeparator = rule.indexOf(':') + 1;

  // we have to split based on the index of the first instance of the separator because the separator could exist in the second half of the rule
  const name = rule.substring(0, indexOfSeparator - 1); // eslint-disable-line unicorn/prefer-string-slice
  let ruleConfig = rule.substring(indexOfSeparator); // eslint-disable-line unicorn/prefer-string-slice

  if (ruleConfig.startsWith('[')) {
    try {
      ruleConfig = JSON.parse(ruleConfig);
    } catch {
      throw new Error(`Error parsing specified \`--rule\` config ${rule} as JSON.`);
    }
  }
  const config = (0, _determineRuleConfig.default)(ruleConfig);
  return {
    name,
    config
  };
}
function validateRules(rules, loadedRules, options) {
  let logger = options.console || console;
  let invalidKeysFound = [];
  let deprecatedNamesFound = [];
  for (let key in rules) {
    if (!loadedRules[key]) {
      const deprecation = _deprecatedRules.default.get(key);
      if (deprecation) {
        deprecatedNamesFound.push({
          oldName: key,
          newName: deprecation
        });
        rules[deprecation] = rules[key];
        delete rules[key];
      } else {
        invalidKeysFound.push(key);
      }
    }
  }
  if (invalidKeysFound.length > 0) {
    logger.log(_chalk.default.yellow(`Invalid rule configuration found: ${invalidKeysFound}`));
  }
  if (deprecatedNamesFound.length > 0) {
    logger.log(_chalk.default.yellow(`Deprecated rule names found: ${JSON.stringify(deprecatedNamesFound, null, 4)}`));
  }
}
function validateOverrides(config, options) {
  if (config.overrides) {
    config.overrides = config.overrides.map(overrideConfig => {
      // If there are keys in the object which are not yet supported by overrides functionality, throw an error.
      let overrideKeys = Object.keys(overrideConfig);
      let containsValidKeys = overrideKeys.every(item => SUPPORTED_OVERRIDE_KEYS.has(item));
      if (!containsValidKeys) {
        throw new Error('Using `overrides` in `.template-lintrc.js` only supports `files` and `rules` sections. Please update your configuration.');
      }

      // clone a deep copy of the override config to ensure it is not mutated
      let clonedResult = JSON.parse(JSON.stringify(overrideConfig));

      // TODO: this should be updated to avoid mutation (mutates for deprecated rules), and the mutation should be moved into `processRules` which is expected to return a new value
      validateRules(clonedResult.rules, config.loadedRules, options);
      clonedResult.rules = processRules(clonedResult);
      return clonedResult;
    });
  }
}
function validateFormat(config) {
  if ('formatters' in config.format) {
    for (let format of config.format.formatters) {
      for (let formatProp of Object.keys(format)) {
        if (!SUPPORTED_FORMAT_PROPS.has(formatProp)) {
          throw new Error(`An invalid \`format.formatter\` in \`.template-lintrc.js\` was provided. Unexpected property \`${formatProp}\``);
        }
      }
    }
  }
}

/**
 * Sets the severity and config on the rule object.
 * Eg:
 * {'no-implicit-this': 'warn'} -> {'no-implicit-this': { severity: 'warn', config: true }}
 * { 'no-implicit-this': [ 'warn', { allow: [ 'fooData' ] } ] }
 * would become:
 * { 'no-implicit-this': { severity: 'warn', config: 'allow': [ 'fooData' ] } }
 * {
 *  'some-rule': 'lol',                   // -> { severity: 2, config: 'lol' }
 *  'other-thing': ['wat', 'is', 'this'], // { severity: 2, config: ['wat', 'is', 'this'] }
 *  'hmm-thing-here': { zomg: 'lol' },    // -> { severity: 2, config: { zomg: 'lol' } }
 *  'another-thing-there': 'off',    // -> { severity: 0, config: false }
 * }
 * @param {*} configData
 */
function processRules(config) {
  let processedRules = Object.assign({}, config.rules);
  for (let key in processedRules) {
    let ruleData = processedRules[key];
    processedRules[key] = (0, _determineRuleConfig.default)(ruleData);
  }
  return processedRules;
}
