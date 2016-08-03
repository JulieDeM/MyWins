var knex = require('../db/knex');

module.exports ={
  findUser : function(user){
    return knex.raw(`SELECT * from users WHERE "userName"='${user}'`)
  },

  findUserId : function(userName){
    return knex.raw(`SELECT id from users WHERE "userName"='${userName}'`)
  },

  addUserInfo : function(user, sport_id){
    return knex.raw(`INSERT INTO users ("userName", favorite_game_id) values(
      '${user}',
      '${sport_id}')`
    )
  }
}
