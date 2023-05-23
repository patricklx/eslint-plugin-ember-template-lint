const plugin = require('eslint-plugin-ember')

const TEXT_CACHE = {};

module.exports = {
  TEXT_CACHE,
  preprocess: (text, filename) => {
    const processed = plugin.processors['<template>'].preprocess(text, filename)
    TEXT_CACHE[filename] = text;
    return [{text: processed[0].text, filename}];
  },
  postprocess: (messages, filename) => {
    return messages.flat();
  },
  supportsAutofix: true
}