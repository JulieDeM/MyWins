var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')
var knex = require('../db/knex');

/* GET users listing. */
function Users() {
  return knex('users'); }

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;