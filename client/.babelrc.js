'use strict';

var env = process.env.BABEL_ENV || process.env.NODE_ENV;

var presets = ['@babel/flow', '@babel/react'];
var plugins = [
  '@babel/syntax-dynamic-import',
  '@babel/plugin-syntax-class-properties',
  '@babel/plugin-syntax-object-rest-spread',
  ['@babel/plugin-proposal-class-properties', {loose: true}],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-unicode-property-regex'
];

if (env === 'development') {
  presets.push.apply(presets, []);
  plugins.push.apply(plugins, ['react-hot-loader/babel']);
}

if (env === 'test') {
  presets.push.apply(presets, [
    [
      '@babel/env',
      {
        targets: {node: '8.9'}
      }
    ]
  ]);
}

if (env === 'production') {
  presets.push.apply(presets, [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['> 1% in JP', 'not Chrome 49', 'last 2 Edge versions', 'last 2 iOS versions']
        }
      }
    ]
  ]);
  plugins.push.apply(plugins, []);
}

module.exports = {presets, plugins};
