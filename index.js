/* jshint node: true */
'use strict';

var fs = require('fs');
var filendir = require('filendir');
var camelCase = require('lodash.camelcase');
var stripComments = require('strip-json-comments');

/**
  `getVariables` is taken from https://github.com/nordnet/sass-variable-loader
*/
var getVariables = function(content) {
  const variableRegex = /\$(.+):\s+(.+);/;
  const variables = {};

  stripComments(content).split('\n').forEach(line => {
    const variable = variableRegex.exec(line);
    if (!variable) { return; }

    const name = camelCase(variable[1].trim());
    const value = variable[2].replace(/!default|!important/g, '').trim();

    variables[name] = value;
    return;
  });

  return variables;
};

module.exports = {
  name: 'ember-cli-sass-variables',
  included: function(app) {
    this.app = app;

    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app;
    }

    this._super.included.apply(this, arguments);
    this.appDir = this.app.options.appDir || 'app';
    this.variablesFile = this.app.options.sassVariables || null;
  },
  preBuild: function(result) {
    if (this.variablesFile) {
      var outputPath = this.appDir + '/utils/sass-variables.js';
      var sassVariables = null;
      var outputFile = null;

      var file = fs.readFileSync(this.variablesFile, 'utf8');
      if (file) {
        sassVariables = getVariables(file);
        var utilObject = `/* eslint-disable */\n/* jshint ignore:start */\n// DON'T UPDATE THIS FILE MANUALLY, IT IS AUTO-GENERATED.\nconst sassVariables = JSON.parse(\`${JSON.stringify(sassVariables)}\`);\n\nexport default sassVariables;\n/* jshint ignore:end */`;
        try {
          outputFile = fs.readFileSync(outputPath, 'utf8');
        } catch(error) {}

        if (outputFile !== utilObject) {
          console.log('ember-cli-sass-variables');
          filendir.writeFileSync(outputPath, utilObject, 'utf8');
        }
      } else {
        console.warn('Please configure the `sassVariables: \'styles/_variables.scss\'` object in ember-cli-build.js`');
      }
    }
    return result;
  }
};
