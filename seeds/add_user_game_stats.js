exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('users').insert({user_game_id: "1", game_id: "1", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "1", game_id: "2", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "2", game_id: "1", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "2", game_id: "2", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "3", game_id: "1", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "3", game_id: "2", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "4", game_id: "1", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "4", game_id: "2", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "5", game_id: "1", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "5", game_id: "2", "gamesPlayed": "0", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "6", game_id: "1", "gamesPlayed": "3", rating: "60", constant: "50"}),
    knex('users').insert({user_game_id: "6", game_id: "2", "gamesPlayed": "7", rating: "195", constant: "10"}),
    knex('users').insert({user_game_id: "7", game_id: "1", "gamesPlayed": "6", rating: "120", constant: "50"}),
    knex('users').insert({user_game_id: "7", game_id: "2", "gamesPlayed": "5", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "8", game_id: "1", "gamesPlayed": "3", rating: "180", constant: "20"}),
    knex('users').insert({user_game_id: "8", game_id: "2", "gamesPlayed": "4", rating: "40", constant: "50"}),
    knex('users').insert({user_game_id: "9", game_id: "1", "gamesPlayed": "8", rating: "90", constant: "50"}),
    knex('users').insert({user_game_id: "9", game_id: "2", "gamesPlayed": "2", rating: "100", constant: "50"}),
    knex('users').insert({user_game_id: "10", game_id: "1", "gamesPlayed": "5", rating: "160", constant: "30"}),
    knex('users').insert({user_game_id: "10", game_id: "2", "gamesPlayed": "9", rating: "70", constant: "50"})
  )
};
