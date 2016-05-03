var express = require('express');

module.exports = (function() {
  'use strict';
  var viewRoute = express.Router();
  
  viewRoute.get('/', function(req, res) {
    res.render('index', { title: 'IamFantasy'});
  });
  
  viewRoute.get('/home', function(req, res) {
    res.render('templates/home');
  });
  
  return viewRoute;
})();