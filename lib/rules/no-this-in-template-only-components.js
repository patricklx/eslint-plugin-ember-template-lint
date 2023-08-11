"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeFs = require("node:fs");
var _nodePath = require("node:path");
var _base = require("./_base.js");
function message(original, fixed) {
  return `Usage of 'this' in path '${original}' is not allowed in a template-only component. ` + `Use '${fixed}' if it is a named argument or create a component.js for this component.`;
}

/**
 * Tests whether the template has a corresponding component class file
 * @param hbsFilePath - path to the template file
 * @param validComponentExtensions - an array of valid component class extensions
 * @returns {boolean} true if a component class was found
 */
function isTemplateOnlyComponent(hbsFilePath, validComponentExtensions) {
  /**
   * Tests whether the component class exists as `component.js`, `component.ts`, etc.
   */
  function componentClassExists(pathWithoutExtension) {
    return validComponentExtensions.some(ext => _nodeFs.existsSync(pathWithoutExtension + ext));
  }
  const paths = _nodePath.normalize(hbsFilePath).split(_nodePath.sep);
  if (paths[0] === 'app' || paths[0] === 'addon') {
    if (paths[1] === 'templates') {
      if (paths[2] === 'components') {
        // classic structure: /app/templates/components/foo.hbs => /app/components/foo.js
        const moduleName = _nodePath.basename(hbsFilePath, '.hbs');
        const classFilePath = _nodePath.join(paths[0], 'components', ...paths.slice(3, -1), moduleName);
        return !componentClassExists(classFilePath);
      } else {
        // route template always has a context
        return false;
      }
    } else if (paths[1] === 'components') {
      // co-located structure: /app/components/foo.hbs => /app/components/foo.js
      const moduleName = _nodePath.basename(hbsFilePath, '.hbs');
      const classFilePath = _nodePath.join(_nodePath.dirname(hbsFilePath), moduleName);
      return !componentClassExists(classFilePath);
    }
  }
  // TODO: handle pods layout
  return true;
}

/**
 * Properties which should be excluded from auto-fix.
 *
 * For example, `{{this.elementId}}` in a template-only component is
 * most likely a bug and should not be converted to `{{@elementId}}`.
 */
const builtInProperties = ['action', 'actionContext', 'actionContextObject', 'attributeBindings', 'childViews', 'classNameBindings', 'classNames', 'concatenatedProperties', 'element', 'elementId', 'parentView', 'tagName', 'target'];
function isFixable(original) {
  return !builtInProperties.some(property => {
    return original === `this.${property}`;
  });
}
const DEFAULT_CONFIG = {
  validComponentExtensions: ['.js', '.ts']
};
class NoThisInTemplateOnlyComponents extends _base {
  parseConfig(config) {
    let configType = typeof config;
    switch (configType) {
      case 'boolean':
        {
          return config ? DEFAULT_CONFIG : false;
        }
      case 'object':
        {
          return {
            validComponentExtensions: config.validComponentExtensions
          };
        }
      case 'undefined':
        {
          return false;
        }
    }
  }
  visitor() {
    if (!isTemplateOnlyComponent(this.filePath, this.config.validComponentExtensions)) {
      // template is allowed to use `this`
      return null;
    }
    return {
      GlimmerPathExpression(path) {
        if (path.this) {
          const fixed = path.original.replace(/^this\./, '@');
          if (this.mode === 'fix' && isFixable(path.original)) {
            path.original = fixed;
          } else {
            this.log({
              message: message(path.original, fixed),
              node: path,
              isFixable: isFixable(path.original)
            });
          }
        }
      }
    };
  }
}
exports.default = NoThisInTemplateOnlyComponents;
module.exports = exports.default;