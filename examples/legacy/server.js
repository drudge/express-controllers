
// Module dependencies.

var express = require('express')
  , controllers = require('express-controllers');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('controllers path', __dirname + '/controllers/');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.controllers();
app.listen(3000);

console.log("Express server listening on port %d", app.address().port);
