var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
