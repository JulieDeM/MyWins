var knex = require('../db/knex');

module.exports ={
  createGameType: function(user_id, game_id){
    return knex.raw(`INSERT into user_games (user_id, game_id) values (${user_id}, ${game_id})`);
    //Julie's code
  },
  createGameTypeTeam: function(user_id, teammate_id, game_id){
      return knex.raw(`INSERT into team_games (team_id, game_id)
      VALUES (${teammate_id}, ${game_id})`);
      //Julie's code
  },
  createGameRecord: function(game_id ,user1_id, user2_id, user1_score, user2_score){
    return knex.raw(`INSERT into user_game_log
      (game_id, user1_id, user2_id, user1_score, user2_score)
      values (${game_id}, ${user1_id}, ${user2_id}, ${user1_score}, ${user2_score})`)
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
  readMoreGameStats: function(user_id, game_id){
    return knex.raw(`SELECT * from user_game_stats
      JOIN user_games
      ON user_game_stats.user_game_id = user_games.id
      WHERE user_game_stats.user_id = ${user_id}
      AND user_games.game_id = ${game_id}`)
  },
  readGameRecords: function(user_id){
    return knex.raw(`SELECT * from user_game_log WHERE
      user1_id = ${user_id} OR user2_id = ${user_id}`)
  },
  readGameStandings: function(game_ids){
    return knex.raw(`SELECT * from user_game_stats
JOIN user_games
ON user_games.id=user_game_stats.user_game_id
JOIN users
ON user_game_stats.user_id=users.id
WHERE game_id=${game_ids}
ORDER BY rating desc`)
//Julie
  },
  updatePlayer: function(user, user_game_id){
    return knex.raw(`UPDATE user_game_stats
      SET "gamesPlayed" = ${user.gamesPlayed}, rating = ${user.rating}, constant = ${user.constant}
      WHERE user_game_id = ${user_game_id}`)
  }
}
