var knexfile = require('../knexfile.js');
var knex = require('knex')(knexfile.development);

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
