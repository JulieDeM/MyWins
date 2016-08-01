var knex = require('../db/knex');

module.exports ={
  games : function(user){
    return knex.raw(`SELECT * from games WHERE name='${name}'`)
  },
  bikeId: function(user){
    return knex.raw(`SELECT id from bikes WHERE driver_id='${user}'`)
  }
}
