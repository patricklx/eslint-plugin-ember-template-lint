"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./_base.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NoRouteAction extends _base.default {
  visitor() {
    return {
      GlimmerSubExpression: node => {
        this.detectRouteAction(node, true);
      },
      GlimmerMustacheStatement: node => {
        this.detectRouteAction(node, false);
      }
    };
  }
  detectRouteAction(node, isSubExpression) {
    if (this.isLocal(node.path)) {
      return;
    }
    let maybeAction = node.path.original;
    if (node.path.type === 'GlimmerStringLiteral') {
      return;
    }
    if (maybeAction !== 'route-action') {
      return;
    }
    if (node.path.data === true || node.path.this === true) {
      return;
    }
    const routeActionName = node.params[0].value;
    this.log({
      message: makeErrorMessage(routeActionName, isSubExpression),
      node
    });
  }
}
exports.default = NoRouteAction;
function makeErrorMessage(actionName, isSubExpression) {
  const usageContext = isSubExpression ? `(route-action '${actionName}')` : `{{route-action '${actionName}'}}`;
  return `Do not use \`route-action\` as ${usageContext}. Instead, use controller actions.`;
}