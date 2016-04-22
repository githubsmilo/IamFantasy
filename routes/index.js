var express = require('express');
var app = require('../app');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.token) {
    app.yf.user.games(
        function(err, data) {
          if (err)
            console.log(err);
          else
            req.session.result = data;

          console.log(data);
        }
      );
  }
  
  res.render('index', { title: 'IamFantasy' });
});

module.exports = router;
