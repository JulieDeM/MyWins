exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('team_games').del(),

    knex('team_games').insert({team_id: "1", game_id: "1"}),
    knex('team_games').insert({team_id: "1", game_id: "2"}),
    knex('team_games').insert({team_id: "2", game_id: "1"}),
    knex('team_games').insert({team_id: "2", game_id: "2"}),
    knex('team_games').insert({team_id: "3", game_id: "1"}),
    knex('team_games').insert({team_id: "3", game_id: "2"}),
    knex('team_games').insert({team_id: "4", game_id: "1"}),
    knex('team_games').insert({team_id: "4", game_id: "2"}),
    knex('team_games').insert({team_id: "5", game_id: "1"}),
    knex('team_games').insert({team_id: "5", game_id: "2"}),
    knex('team_games').insert({team_id: "6", game_id: "1"}),
    knex('team_games').insert({team_id: "6", game_id: "2"}),
    knex('team_games').insert({team_id: "7", game_id: "1"}),
    knex('team_games').insert({team_id: "7", game_id: "2"}),
    knex('team_games').insert({team_id: "8", game_id: "1"}),
    knex('team_games').insert({team_id: "8", game_id: "2"})
  )
};
