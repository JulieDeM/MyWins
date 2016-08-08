var knex = require('../db/knex');

module.exports ={
  findUser : function(user){
    return knex.raw(`SELECT * from users WHERE "userName"='${user}'`)
  },

  findUserId : function(fbid){
    return knex.raw(`SELECT id from users WHERE fb_uid='${fbid}'`)
  },

  getusername : function(user){
    return knex.raw(`SELECT * from users WHERE fb_uid='${user.id}'`)
  },

  readUser : function(fbid){
    return knex.raw(`SELECT * from users WHERE fb_uid='${fbid}'`)
  },

  updateUser: function(user, game_id, fbid){
    return knex.raw(`UPDATE users SET
      "userName" = '${user}',
      favorite_game_id = ${game_id}
      WHERE fb_uid = '${fbid}'`
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
