# Express Controllers

  express-controllers adds controller style routing from the model-view-controller paradigm to express using [express-resource](http://github.com/visionmedia/express-resource).

## Installation

npm:

    $ npm install express-controllers

## Usage

 To get started simply `require('express-controllers')`, and this module will monkey-patch Express, enabling the controller style routing by providing the `app.controllers()` method. A "controller" is simply a module, which defines one of more of the supported "actions" listed below:

    exports.index = function(req, res){
      res.send('forum index');
    };

    exports.new = function(req, res){
      res.send('new forum');
    };

    exports.create = function(req, res){
      res.send('create forum');
    };

    exports.show = function(req, res){
      res.send('show forum ' + req.params.forum);
    };

    exports.edit = function(req, res){
      res.send('edit forum ' + req.params.forum);
    };

    exports.update = function(req, res){
      res.send('update forum ' + req.params.forum);
    };

    exports.destroy = function(req, res){
      res.send('destroy forum ' + req.params.forum);
    };

By default, the `app.controllers()` method will load any controllers in the directory named `controllers` of your application (wherever node_modules is). If you prefer to store your controllers in a different location, simply specify your desired path in the app setting via `app.set('controllers path', '/path/to/controllers/')`.

    var express = require('express')
      , controllers = require('express-controllers')
      , app = express.createServer();

    app.set('controllers path', __dirname + '/controllers/');
    app.controllers();
    app.listen(3000);

## Default Action Mapping

Actions are then mapped as follows (by default), providing `req.params.forum` which contains the substring where ":forum" is shown below:

    GET     /forums              ->  index
    GET     /forums/new          ->  new
    POST    /forums              ->  create
    GET     /forums/:forum       ->  show
    GET     /forums/:forum/edit  ->  edit
    PUT     /forums/:forum       ->  update
    DELETE  /forums/:forum       ->  destroy

## Content-Negotiation

  Currently express-controllers (by way of express-resource) supports basic content-negotiation support utilizing extnames or "formats". This can currently be done two ways, first we may define actions as we normally would, and utilize the `req.format` property, and respond accordingly. The following would respond to `GET /pets.xml`, and `GET /pets.json`.
  
      var pets = ['tobi', 'jane', 'loki'];

      exports.index = function(req, res){
        switch (req.format) {
          case 'json':
            res.send(pets);
            break;
          case 'xml':
            res.send('<pets>' + pets.map(function(pet){
              return '<pet>' + pet + '</pet>';
            }).join('') + '</pets>');
            break;
          default:
            res.send(406);
        }
      };

 The following is equivalent, however we separate the logic into several callbacks, each representing a format. 
 
     exports.index = {
       json: function(req, res){
         res.send(pets);
       },

       xml: function(req, res){
         res.send('<pets>' + pets.map(function(pet){
           return '<pet>' + pet + '</pet>';
         }).join('') + '</pets>');
       }
     };

 We may also provide a `default` format, invoked when either no extension is given, or one that does not match another method is given:
 
 
     exports.default = function(req, res){
       res.send('Unsupported format "' + req.format + '"', 406);
     };

## License

    The MIT License

    Copyright (c) 2011 Nicholas Penree <drudge@conceited.net>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    'Software'), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
