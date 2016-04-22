
/**
 * Create conf.js like below
 *
 * module.exports = {
 *   'APP_CLIENT_ID': 'CLIENT_ID_GIVEN_BY_YAHOO',
 *   'APP_CLIENT_SECRET': 'CLIENT_SECRET_GIVEN_BY_YAHOO'
 * }
 */

var express = require('express');
var qs = require('querystring');
var request = require('request');
var app = require('../app');

var router = express.Router();

var clientId = process.env.APP_CLIENT_ID || require('../conf.js').APP_CLIENT_ID;
var clientSecret = process.env.APP_CLIENT_SECRET || require('../conf.js').APP_CLIENT_SECRET;
var redirectUri = process.env.APP_REDIRECT_URI || 'http://myapp.com/auth/callback';

router.get('/', function(req, res, next) {
  var authorizationUrl = 'https://api.login.yahoo.com/oauth2/request_auth';
  var queryParams = qs.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code'
  });
  
  res.redirect(authorizationUrl + '?' + queryParams);
});

router.get('/callback', function(req, res, next) {
  var accessTokenUrl = 'https://api.login.yahoo.com/oauth2/get_token';
  var options = {
    url: accessTokenUrl,
    headers: { Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64') },
    rejectUnauthorized: false,
    json: true,
    form: {
      code: req.query.code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }
  };
  
  request.post(options, function(error, response, body) {
    if (error)
      console.log('[auth/callback] Failed to request.post. err:' + err);
    else {
      var accessToken = body.access_token;
      var refreshToken = body.refresh_token;

      // Save accessToken.
      req.session.token = accessToken;
      
      // Set accessToken to yahooApi.
      app.yf.setUserToken(accessToken);
      
      return res.redirect('/');
    }
  });
});

module.exports = router;