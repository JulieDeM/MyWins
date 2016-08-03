var knex = require('../db/knex');

module.exports ={
  createGameType: function(user_id, game_id){

  },
  createGameTypeTeam: function(user_id, teammate_id, game_id){

  },
  createGameRecord: function(game_id ,user1_id, user2_id, user1_score, user2_score){
    return knex.raw(`INSERT into user_game_log (game_id, user1_id, user2_id, user1_score, user2_score) values (${game_id}, ${user1_id}, ${user2_id}, ${user1_score}, ${user2_score})`)
  },
  createGameRecordTeam: function(user_id, opponent_id, user_score, opp_score){

  },
  readUser: function(user_name){
    return knex.raw(`SELECT * from users WHERE "userName" ='${user_name}'`)
  },
  readGameTypes: function(user_id){
    return knex.raw(`SELECT * from user_games WHERE user_id = ${user_id}`)
  },
  readGameStats: function(user_id){
    return knex.raw(`SELECT * from user_game_stats WHERE user_id = ${user_id}`)
  },
  readGameRecords: function(user_id){
    return knex.raw(`SELECT * from user_game_log WHERE
      user1_id = ${user_id} OR user2_id = ${user_id}`)
  },
  readGameStandings: function(thing){

  }
}
