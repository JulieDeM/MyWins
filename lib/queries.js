var knex = require('../db/knex');

module.exports ={
  findUser : function(user){
    return knex.raw(`SELECT * from users WHERE "userName"='${user}'`)
  },

  findUserId : function(userName){
    return knex.raw(`SELECT id from users WHERE "userName"='${userName}'`)
  },

  addUserInfo : function(user, game_id){
    return knex.raw(`INSERT INTO users ("userName", favorite_game_id) values(
      '${user}',
      '${game_id}')`
    )
  },

  addUserGame : function(user_id, game_id){
    return knex.raw(`INSERT INTO user_games (user_id, game_id) values(
      '${user_id}',
      '${game_id}')`
    )
  },

  findUserGameId : function(userId){
    return knex.raw(`SELECT id from user_games WHERE "user_id"='${userId}'`)
  },

  addUserGameStats : function(user_id, user_game_id, gamesPlayed, rating, constant){
    return knex.raw(`INSERT INTO user_game_stats (user_id, user_game_id, "gamesPlayed", rating, constant) values(
      '${user_id}',
      '${user_game_id}',
      ${gamesPlayed},
      ${rating},
      ${constant})`
    )
  },

}
