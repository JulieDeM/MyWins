var knex = require('../db/knex');

module.exports ={
  createGameType: function(user_id, game_id){

  },
  createGameTypeTeam: function(user_id, teammate_id, game_id){

  },
  createGameRecord: function(user_id, opponent_id, user_score, opp_score){

  },
  createGameRecordTeam: function(user_id, opponent_id, user_score, opp_score){

  },
  readUser: function(user_name){
    return knex.raw(`SELECT * from users WHERE "userName" ='${user_name}'`)
  },
  readGameTypes: function(user_id){
    return knex.raw(`SELECT * from user_games WHERE user_id ='${user_id}'`)
  },
  readGameStats: function(game_id){
    return knex.raw(`SELECT * from user_game_stats WHERE "userName" ='${user_name}'`)
  },
  readGameRecords: function(thing){

  },
  readGameStandings: function(thing){

  }
}
