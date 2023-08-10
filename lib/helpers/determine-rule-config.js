"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = determineRuleConfig;
var _severity = require("./severity.js");
function _determineConfigForSeverity(config) {
  switch (config) {
    case 'off':
      {
        return {
          config: false,
          severity: _severity.IGNORE_SEVERITY
        };
      }
    case 'warn':
      {
        return {
          config: true,
          severity: _severity.WARNING_SEVERITY
        };
      }
    case 'error':
      {
        return {
          config: true,
          severity: _severity.ERROR_SEVERITY
        };
      }
  }
}
function determineRuleConfig(ruleData) {
  let ruleConfig = {
    severity: ruleData === false ? _severity.IGNORE_SEVERITY : _severity.ERROR_SEVERITY,
    config: ruleData
  };
  let severityConfig;
  // In case of {'no-implicit-this': 'off|warn|error'}
  if (typeof ruleData === 'string') {
    severityConfig = _determineConfigForSeverity(ruleData);
    if (severityConfig) {
      ruleConfig = severityConfig;
    }
  } else if (Array.isArray(ruleData)) {
    // array of severity and custom rule config
    let severity = ruleData[0];
    severityConfig = _determineConfigForSeverity(severity);
    if (severityConfig) {
      ruleConfig.severity = severityConfig.severity;
      ruleConfig.config = ruleData[1];
    }
  }
  return ruleConfig;
}