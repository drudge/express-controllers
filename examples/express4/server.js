
// Module dependencies.

var express = require('express')
var controllers = require('../../'); // Monkey patch express

var app = express().controllers();

if (!require.parent) {
  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express 4 server listening at http://%s:%s', host, port);
  });
}

module.exports = app;