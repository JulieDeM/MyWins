exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('teams').del(),

    knex('teams').insert({name: "teamAwesome", user1_id: "1", user2_id: "2"}),
    knex('teams').insert({name: "teamNoobs", user1_id: "3", user2_id: "4"}),
    knex('teams').insert({name: "teamCheesecake", user1_id: "5", user2_id: "6"}),
    knex('teams').insert({name: "teamGoons", user1_id: "7", user2_id: "8"}),
    knex('teams').insert({name: "teamAmigas", user1_id: "9", user2_id: "10"}),
    knex('teams').insert({name: "teamDenver", user1_id: "7", user2_id: "2"}),
    knex('teams').insert({name: "teamBadass", user1_id: "1", user2_id: "8"}),
    knex('teams').insert({name: "teamBond", user1_id: "4", user2_id: "6"})
  )
};
