/* jshint node: true */
'use strict';

var fs = require('fs');
var filendir = require('filendir');
var camelCase = require('lodash.camelcase');
var stripComments = require('strip-json-comments');

var getVariables = function(content) {
  const variableRegex = /\$(.+):\s+(.+);/;
  const variables = [];

  stripComments(content).split('\n').forEach(line => {
    const variable = variableRegex.exec(line);
    if (!variable) { return; }

    const name = camelCase(variable[1].trim());
    const value = variable[2].replace(/!default|!important/g, '').trim();

    variables.push({ name, value });
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
    this.options = this.app.options.sassVariables || {};
  },
  postprocessTree: function(type, tree) {
    if (type === 'all' || type === 'styles') {
      if (this.options.variablesFile) {
        var file = fs.readFileSync(this.options.variablesFile, 'utf8');
        var sassVariables = getVariables(file);

        filendir.writeFileSync('app/utils/sass-variables.js', `const sassVariables = JSON.parse(\`${JSON.stringify(sassVariables)}\`);\n\nexport default sassVariables;`, 'utf8');
      }
    }
    return tree;
  }
};
