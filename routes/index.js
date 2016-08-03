var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('FBindex');
});

module.exports = router;
