const fs = require('fs');
const path = require('path')
const glimmerVisitorKeys = require(path.join(
  path.dirname(require.resolve('@glimmer/syntax')),
  'lib/v1/visitor-keys'
)).default;

const nodeNames = Object.keys(glimmerVisitorKeys);

let root = './tr/rules/';
let entries = fs.readdirSync(root);

for (const entry of entries) {
  let content = fs.readFileSync(root + entry).toString();
  for (const nodeName of nodeNames) {
    const regex = new RegExp(`\\b${nodeName}\\b`, 'g');
    content = content.replace(regex, `Glimmer${nodeName}`);
  }
  fs.writeFileSync(root + entry, content);
}

root = './tr/helpers/';
entries = fs.readdirSync(root);

for (const entry of entries) {
  let content = fs.readFileSync(root + entry).toString();
  for (const nodeName of nodeNames) {
    const regex = new RegExp(`\\b${nodeName}\\b`, 'g');
    content = content.replace(regex, `Glimmer${nodeName}`);
  }
  fs.writeFileSync(root + entry, content);
}

root = './tr/config/';
entries = fs.readdirSync(root);

for (const entry of entries) {
  let content = fs.readFileSync(root + entry).toString();
  for (const nodeName of nodeNames) {
    const regex = new RegExp(`\\b${nodeName}\\b`, 'g');
    content = content.replace(regex, `Glimmer${nodeName}`);
  }
  fs.writeFileSync(root + entry, content);
}

