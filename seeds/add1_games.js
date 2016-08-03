exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('games').insert({type: 'Ping Pong'}),
    knex('games').insert({type: 'Foosball'}),
    knex('games').insert({type: 'Air Hockey'}),
    knex('games').insert({type: 'Cornhole'}),
    knex('games').insert({type: 'Bocce Ball'}),
    knex('games').insert({type: 'Pool'}),
    knex('games').insert({type: 'Spikeball'}),
    knex('games').insert({type: 'Kan Jam'}),
    knex('games').insert({type: 'Cards'})
  )
};
