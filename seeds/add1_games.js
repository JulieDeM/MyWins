exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('games').insert({type: 'ping_pong'}),
    knex('games').insert({type: 'foosball'}),
    knex('games').insert({type: 'air_hockey'}),
    knex('games').insert({type: 'cornhole'}),
    knex('games').insert({type: 'bocce_ball'}),
    knex('games').insert({type: 'pool'}),
    knex('games').insert({type: 'spikeball'}),
    knex('games').insert({type: 'kan_jam'}),
    knex('games').insert({type: 'cards'})
  )
};
