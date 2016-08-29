var knex = require('../db/knex');

module.exports ={
  createGameType: function(user_id, game_id){
     return knex.raw(`INSERT into user_games (user_id, game_id) values (${user_id}, ${game_id})`);
   },
   createGameTypeTeam: function(user_id, teammate_id, team_name){
       return knex.raw(`INSERT into teams (user1_id, user2_id, name)
       VALUES (${user_id}, ${teammate_id}, '${team_name}')`);
   },
   getTeamId: function(team_name){
     return knex.raw(`SELECT id from teams WHERE name='${team_name}'`)
   },
   createTeamGameID: function(team_id, game_id){
       return knex.raw(`INSERT into team_games (team_id, game_id )
       VALUES (${team_id}, ${game_id})`);
   },
  createGameRecord: function(game_id ,user1_id, user2_id, user1_score, user2_score){
    return knex.raw(`INSERT into user_game_log
      (game_id, user1_id, user2_id, user1_score, user2_score)
      values (${game_id}, ${user1_id}, ${user2_id}, ${user1_score}, ${user2_score})`)
  },
  createGameRecordTeam: function(user_id, opponent_id, user_score, opp_score){
    return knex.raw(`INSERT into team_game_log
      (game_id, team1_id, team2_id, team1_score, team2_score)
      values (${game_id}, ${team1_id}, ${team2_id}, ${team1_score}, ${team2_score})`)
  },
  readUser: function(user_name){
    return knex.raw(`SELECT * from users WHERE "userName" ='${user_name}'`)
  },
  readUserId: function(user){
  return knex.raw(`SELECT * from users
    WHERE id = ${user}`)
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
      WHERE user_game_log.user1_id = ${user_id} OR user_game_log.user2_id = ${user_id}
      `)
  },
  readGameStandings: function(game_ids){
     return knex.raw(`SELECT * from user_game_stats
      JOIN user_games
      ON user_games.id=user_game_stats.user_game_id
      JOIN users
      ON user_game_stats.user_id=users.id
      WHERE game_id=${game_ids}
      ORDER BY rating desc`)
   },
  readTeams: function(user_id){
    return knex.raw(`SELECT * from teams
      JOIN team_games
      ON teams.id = team_games.team_id
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
 readTeamId: function(team){
   return knex.raw(`SELECT * from teams
     WHERE id = ${team}`)
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
    WHERE team_game_id = ${team_game_id}`)
},
  PlayerName: function(user_id){
    return knex.raw(`SELECT * from users WHERE id = ${user_id}`)
  },
  createPlayerGame: function(user_id, game_id){
    return knex.raw(`INSERT into user_games (user_id, game_id) values (${user_id}, ${game_id})`)
  },
  UserGameId: function(user_id){
    return knex.raw(`SELECT * from user_games WHERE user_id=${user_id}`)
  },
  addStats: function(user_id, usergamesid){
    return knex.raw(`INSERT into user_game_stats (user_id, user_game_id, "gamesPlayed", rating, constant) values (${user_id}, ${usergamesid}, 0, 100, 40)`)
  },
  readSingleGameStandings: function(){
   return knex.raw(`SELECT * from user_game_stats
    JOIN user_games
    ON user_games.id=user_game_stats.user_game_id
    JOIN users
    ON user_game_stats.user_id=users.id
    ORDER BY rating desc`)
  },
  readTeamGameStandings: function(){
   return knex.raw(`SELECT * from team_game_stats
    JOIN team_games
    ON team_games.id=team_game_stats.team_game_id
    JOIN teams
    ON team_game_stats.team_id=teams.id
    ORDER BY "teamRating" desc`)
  }
}
