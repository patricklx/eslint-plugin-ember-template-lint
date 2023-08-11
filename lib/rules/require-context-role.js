"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _astNodeInfo = require("../helpers/ast-node-info.js");
var _base = require("./_base.js");
const ROOTS = {
  row: ['rowheader', 'columnheader', 'cell', 'gridcell'],
  group: ['listitem', 'menuitem', 'menuitemradio', 'treeitem'],
  menu: ['menuitem', 'menuitemcheckbox', 'menuitemradio'],
  menubar: ['menuitem', 'menuitemcheckbox', 'menuitemradio'],
  list: ['listitem'],
  listbox: ['option'],
  grid: ['row', 'rowheader', 'rowgroup'],
  rowgroup: ['row'],
  treegrid: ['row', 'rowgroup'],
  tablist: ['tab'],
  table: ['row', 'rowgroup'],
  tree: ['treeitem']
};
const CHILDREN_FOR_ANALYZE = new Set(Object.keys(ROOTS).reduce((acc, keyName) => [...acc, ...ROOTS[keyName]], []));
const VALID_PARENTS_FOR_CHILD = Object.keys(ROOTS).reduce((result, keyName) => {
  const children = ROOTS[keyName];
  for (const childName of children) {
    if (!(childName in result)) {
      result[childName] = [];
    }
    result[childName].push(keyName);
  }
  return result;
}, {});
for (const key of Object.keys(VALID_PARENTS_FOR_CHILD)) {
  VALID_PARENTS_FOR_CHILD[key].sort();
}
function errorMessage(role) {
  const roles = VALID_PARENTS_FOR_CHILD[role] || [];
  return `You have an element with the role of "${role}" but it is missing the required (immediate) parent element of "[${roles.join(', ')}]". Reference: https://www.w3.org/TR/wai-aria-1.1/#${role}.`;
}
function roleName(roleNode) {
  return roleNode && roleNode.value.type === 'GlimmerTextNode' ? roleNode.value.chars : '';
}
class RequireContextRole extends _base {
  visitor() {
    return {
      GlimmerElementNode(node, path) {
        const ariaHidden = _astNodeInfo.hasAttribute(node, 'aria-hidden');
        if (ariaHidden) {
          return;
        }
        const role = _astNodeInfo.findAttribute(node, 'role');
        if (!role) {
          return;
        }
        const roleValue = roleName(role);
        if (!roleValue) {
          return;
        }
        if (!CHILDREN_FOR_ANALYZE.has(roleValue)) {
          return;
        }
        let parentPath = path;
        let parentElementIndex = 0;
        while (parentPath && parentPath.parent && parentElementIndex === 0) {
          parentPath = parentPath.parent;
          let parentNode = parentPath.node;
          if (parentNode && parentNode.type === 'GlimmerElementNode') {
            if (_astNodeInfo.hasAttribute(parentNode, 'aria-hidden')) {
              return;
            }
            const parentRole = _astNodeInfo.findAttribute(parentNode, 'role');
            const parentRoleValue = parentRole ? roleName(parentRole) : '';
            if (parentRoleValue === 'presentation' || parentRoleValue === 'none') {
              continue;
            }
            parentElementIndex++;
            if (!VALID_PARENTS_FOR_CHILD[roleValue].includes(parentRoleValue)) {
              this.log({
                message: errorMessage(roleValue),
                line: role.loc && role.loc.start.line,
                column: role.loc && role.loc.start.column,
                source: this.sourceForNode(role),
                node: role
              });
            }
          }
        }
      }
    };
  }
}
exports.default = RequireContextRole;
module.exports = exports.default;