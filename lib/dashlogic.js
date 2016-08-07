var knex = require('../db/knex');

module.exports ={
  createGameType: function(user_id, game_id){
    // Julie's code here
  },
  createGameTypeTeam: function(user_id, teammate_id, game_id){

  },
  createGameRecord: function(game_id ,user1_id, user2_id, user1_score, user2_score){
    return knex.raw(`INSERT into user_game_log
      (game_id, user1_id, user2_id, user1_score, user2_score)
      values (${game_id}, ${user1_id}, ${user2_id}, ${user1_score}, ${user2_score})`)
  },
  createGameRecordTeam: function(game_id, team1_id, team2_id, team1_score, team2_score){
    return knex.raw(`INSERT into team_game_log
      (game_id, team1_id, team2_id, team1_score, team2_score)
      values (${game_id}, ${team1_id}, ${team2_id}, ${team1_score}, ${team2_score})`)
  },
  readUser: function(user_name){
    return knex.raw(`SELECT * from users WHERE "userName" ='${user_name}'`)
  },
  readAllUsers: function(){
    return knex.raw(`SELECT * from users`)
  },
  readGameTypes: function(user_id){
    return knex.raw(`SELECT *,
      user_games.id AS usergamesid from user_games
      JOIN games
      ON user_games.game_id = games.id
      WHERE user_id = ${user_id}`)
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
    return knex.raw(`SELECT *, user_game_log.id
      AS record_id from user_game_log
      JOIN users
      ON users.id = user_game_log.user1_id
      OR users.id = user_game_log.user2_id
      WHERE user_game_log.user1_id = ${user_id}
      OR user_game_log.user2_id = ${user_id}
      `)
  },
  readGameStandings: function(thing){

  },
  readTeams: function(user_id){
    return knex.raw(`SELECT * from teams
      JOIN team_games
      ON teams.id = team_games.team_id
      JOIN team_game_stats
      ON team_games.id = team_game_stats.team_game_id
      JOIN games
      ON team_games.game_id = games.id
      WHERE teams.user1_id = ${user_id}
      OR teams.user2_id = ${user_id}`)
  },
  readTeamRecords: function(user_id){
    return knex.raw(`SELECT *,
      team_game_log.id AS record_id
      from team_game_log
      JOIN teams
      ON teams.id = team_game_log.team1_id
      OR teams.id = team_game_log.team2_id
      WHERE teams.user1_id = ${user_id}
      OR teams.user2_id = ${user_id}
      `)
  },
  readTeamStats: function(team_id, game_id){
    return knex.raw (`SELECT * from team_game_stats
      JOIN team_games
      ON team_game_stats.team_game_id = team_games.id
      WHERE team_game_stats.team_id = ${team_id}
      AND team_games.game_id = ${game_id}
      `)
  },
  readAllTeamNames: function(){
    return knex.raw(`SELECT * from teams;`)
  },
  updatePlayer: function(user, user_game_id){
    return knex.raw(`UPDATE user_game_stats
      SET "gamesPlayed" = ${user.gamesPlayed}, rating = ${user.rating}, constant = ${user.constant}
      WHERE user_game_id = ${user_game_id}`)
  },
  updateTeam: function(team, team_game_id){
    return knex.raw(`UPDATE team_game_stats
      SET "gamesPlayed" = ${team.gamesPlayed}, "teamRating" = ${team.teamRating},
      "teamConstant" = ${team.teamConstant}
      WHERE team_game_id = ${team_game_id}
      `)
  }
}
