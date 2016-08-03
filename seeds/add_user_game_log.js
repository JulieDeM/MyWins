exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('users').insert({game_id: "1", user_1_id: "1", user_2_id: "0", user_1_score: "1", user_2_score: "0"})
  )
};
