var express = require('express');
var app = require('../app');

module.exports = (function() {
  'use strict';
  var apiRoute = express.Router();
  
  apiRoute.get('/', function(req, res) {
    app.userModel.findOne( { test1: 'test1'}, function (err, existingUser) {
      if (existingUser) {
        res.send(existingUser.test2);
      } else {
        var user = new app.userModel({
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        });
        
        user.save(function(err) {
          console.log('success to add');
        });
      }
    });
  });
  
  return apiRoute;
})();