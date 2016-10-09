/*
 Based on: pug-html-loader
 */
'use strict';
var util = require('loader-utils');
var pug = require('pug');

module.exports = function(source) {

  if (this.cacheable) {
    this.cacheable(true)
  }

  var query = util.parseQuery(this.query);
  var options = Object.assign({
    filename: this.resourcePath,
    doctype: query.doctype || 'js',
    compileDebug: this.debug || false
  }, query);
  var template = pug.compile(source, options);
  var content = template(query);
  return content;
};
