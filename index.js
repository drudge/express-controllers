
/*!
 * Express - Controllers
 * Copyright(c) 2011 Nicholas Penree <drudge@conceited.net>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , resource = require('express-resource')
  , readdir = require('fs').readdirSync
  , join = require('path').join
  , extname = require('path').extname

/**
 * Define resources for all controllers defined in your `controllers` directory
 *
 * This method will create an express resource for all files in your `controllers path`
 * setting, defaulting to `'/../../controllers/'`.
 * @param {Object} Express app
 * @return {Resource}
 * @api public
 */
  
module.exports =
express.HTTPServer.prototype.controllers =
express.HTTPSServer.prototype.controllers = function(app){
  var loaded = []
    , self = app || this
    , controllerPath = self.set('controllers path') || __dirname + '/../../controllers';

  readdir(controllerPath).forEach(function(file){
    if (file.match(/^.*.js$/ig)){
      var controller = file.replace(extname(file), '');
      loaded.push(controller);
      
      if (typeof self.resource !== 'undefined'){
        loaded[controller] = self.resource(controller, require(join(controllerPath, controller)));
      }
    }
  });

  return loaded;
};
