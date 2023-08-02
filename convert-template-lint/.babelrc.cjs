module.exports = {
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    'babel-plugin-transform-import-meta',
    'module:@reactioncommerce/babel-remove-es-create-require',
    'babel-plugin-transform-async-to-promises',
    ['babel-plugin-async-import', {template: 'require(REQUEST)'}]
  ]
}
