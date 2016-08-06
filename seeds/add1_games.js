exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('games').insert({type: 'Ping Pong', colors: '#FF2D55'}),
    knex('games').insert({type: 'Foosball', colors: '#4CD964' }),
    knex('games').insert({type: 'Air Hockey', colors: '##C86EDF'}),
    knex('games').insert({type: 'Cornhole', colors: '#FFCC00'}),
    knex('games').insert({type: 'Bocce Ball', colors: '#34AADC'}),
    knex('games').insert({type: 'Pool', colors: '#FF9500'}),
    knex('games').insert({type: 'Spikeball', colors: '#4A4A4A'}),
    knex('games').insert({type: 'Kan Jam', colors: '#EF4DB6'}),
    knex('games').insert({type: 'Cards', colors: '#4CD3B4'})
  )
};
