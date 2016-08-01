var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')

router.get('/sign_up/facebook', function(req, res, next) {
  res.render('facebooklogin');
});

router.get('/sign_up/userGameAndName', function(req, res, next) {
  res.render('chooseGameAndName');
});

router.get('/sign_up/howToPage', function(req, res, next) {
  res.render('howToPage');
});


module.exports = router;
