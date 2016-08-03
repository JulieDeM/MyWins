exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('user_games').del(),

    knex('user_games').insert({user_id: "1", game_id: "1"}),
    knex('user_games').insert({user_id: "1", game_id: "2"}),
    knex('user_games').insert({user_id: "2", game_id: "1"}),
    knex('user_games').insert({user_id: "2", game_id: "2"}),
    knex('user_games').insert({user_id: "3", game_id: "1"}),
    knex('user_games').insert({user_id: "3", game_id: "2"}),
    knex('user_games').insert({user_id: "4", game_id: "1"}),
    knex('user_games').insert({user_id: "4", game_id: "2"}),
    knex('user_games').insert({user_id: "5", game_id: "1"}),
    knex('user_games').insert({user_id: "5", game_id: "2"}),
    knex('user_games').insert({user_id: "6", game_id: "1"}),
    knex('user_games').insert({user_id: "6", game_id: "2"}),
    knex('user_games').insert({user_id: "7", game_id: "1"}),
    knex('user_games').insert({user_id: "7", game_id: "2"}),
    knex('user_games').insert({user_id: "8", game_id: "1"}),
    knex('user_games').insert({user_id: "8", game_id: "2"}),
    knex('user_games').insert({user_id: "9", game_id: "1"}),
    knex('user_games').insert({user_id: "9", game_id: "2"}),
    knex('user_games').insert({user_id: "10", game_id: "1"}),
    knex('user_games').insert({user_id: "10", game_id: "2"})
  )
};
