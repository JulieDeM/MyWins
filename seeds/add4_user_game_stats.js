exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('user_game_stats').del(),

    knex('user_game_stats').insert({user_id: "1", user_game_id: "1", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "1", user_game_id: "2", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "2", user_game_id: "3", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "2", user_game_id: "4", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "3", user_game_id: "5", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "3", user_game_id: "6", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "4", user_game_id: "7", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "4", user_game_id: "8", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "5", user_game_id: "9", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "5", user_game_id: "10", "gamesPlayed": "0", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "6", user_game_id: "11", "gamesPlayed": "3", rating: "60", constant: "40"}),
    knex('user_game_stats').insert({user_id: "6", user_game_id: "12", "gamesPlayed": "7", rating: "195", constant: "10"}),
    knex('user_game_stats').insert({user_id: "7", user_game_id: "13", "gamesPlayed": "6", rating: "120", constant: "40"}),
    knex('user_game_stats').insert({user_id: "7", user_game_id: "14", "gamesPlayed": "5", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "8", user_game_id: "15", "gamesPlayed": "3", rating: "180", constant: "20"}),
    knex('user_game_stats').insert({user_id: "8", user_game_id: "16", "gamesPlayed": "4", rating: "40", constant: "40"}),
    knex('user_game_stats').insert({user_id: "9", user_game_id: "17", "gamesPlayed": "8", rating: "90", constant: "40"}),
    knex('user_game_stats').insert({user_id: "9", user_game_id: "18", "gamesPlayed": "2", rating: "100", constant: "40"}),
    knex('user_game_stats').insert({user_id: "10", user_game_id: "19", "gamesPlayed": "5", rating: "160", constant: "30"}),
    knex('user_game_stats').insert({user_id: "10", user_game_id: "20", "gamesPlayed": "9", rating: "70", constant: "40"})
  )
};
