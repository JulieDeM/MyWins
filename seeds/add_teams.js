exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('teams').del(),

    knex('teams').insert({name: "teamAwesome", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamNoobs", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamCheesecake", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamGoons", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamAmigas", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamDenver", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamBadass", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamBond", user1_id: "1", user2_id: "2"})
  )
};
