/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    sassVariables: './tests/dummy/app/styles/_variables.scss'
  });
  return app.toTree();
};
