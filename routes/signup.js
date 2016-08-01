var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')

router.get('/facebook', function(req, res, next) {
  res.render('facebooklogin');
});

router.get('/userGameAndName', function(req, res, next) {
  res.render('chooseGameAndName');
});

router.get('/howToPage', function(req, res, next) {
  res.render('howToPage');
});


module.exports = router;
