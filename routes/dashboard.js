var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')
var Dashboard = require('../lib/queries')

router.get('/', function(req, res, next){
      res.render('dashboard');
})

module.exports = router;
