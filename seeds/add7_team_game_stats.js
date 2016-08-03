exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('team_game_stats').del(),

    knex('team_game_stats').insert({team_id: "1", team_game_id: "1", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "1", team_game_id: "2", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "2", team_game_id: "3", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "2", team_game_id: "4", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "3", team_game_id: "5", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "3", team_game_id: "6", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "4", team_game_id: "7", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "4", team_game_id: "8", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "5", team_game_id: "9", "gamesPlayed": "0", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "5", team_game_id: "10", "gamesPlayed": "5", "teamRating": "150", "teamConstant": "30"}),
    knex('team_game_stats').insert({team_id: "6", team_game_id: "11", "gamesPlayed": "3", "teamRating": "60", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "6", team_game_id: "12", "gamesPlayed": "7", "teamRating": "195", "teamConstant": "10"}),
    knex('team_game_stats').insert({team_id: "7", team_game_id: "13", "gamesPlayed": "6", "teamRating": "120", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "7", team_game_id: "14", "gamesPlayed": "5", "teamRating": "100", "teamConstant": "40"}),
    knex('team_game_stats').insert({team_id: "8", team_game_id: "15", "gamesPlayed": "3", "teamRating": "180", "teamConstant": "20"}),
    knex('team_game_stats').insert({team_id: "8", team_game_id: "16", "gamesPlayed": "4", "teamRating": "40", "teamConstant": "40"})

  )
};
