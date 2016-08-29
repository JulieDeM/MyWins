exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('games').insert({id: 1, type: 'Ping Pong', colors: '#FF2D55', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/ping-pong-white.png?alt=media&token=0968e77a-c8e1-42f8-85d2-8f924d1dc56f" }),
    knex('games').insert({id: 2, type: 'Foosball', colors: '#4CD964', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/foosball-white.png?alt=media&token=1820e267-0f43-414e-a18a-d206feaa4a8d" }),
    knex('games').insert({id: 3, type: 'Air Hockey', colors: '##C86EDF', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/air-white.png?alt=media&token=976b7c9f-9506-4e39-b9d4-95e1c477ca22"}),
    knex('games').insert({id: 4, type: 'Cornhole', colors: '#FFCC00', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/cornhole-white.png?alt=media&token=fdbf69ec-2635-4838-92ab-c9351c93f793"}),
    knex('games').insert({id: 5, type: 'Bocce Ball', colors: '#34AADC', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/boccee%20white.png?alt=media&token=ac45db39-ad37-4975-bef2-aa351fe1679b"}),
    knex('games').insert({id: 6, type: 'Pool', colors: '#FF9500', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/pool-white.png?alt=media&token=bdbd1abe-a455-4496-9f53-cbb3f22c3500"}),
    knex('games').insert({id: 7, type: 'Spikeball', colors: '#4A4A4A', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/spike-white.png?alt=media&token=fc9247c3-26e8-4b6a-bf7a-e0db512fa4e1"}),
    knex('games').insert({id: 8, type: 'Kan Jam', colors: '#EF4DB6', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/kan-white.png?alt=media&token=cdba6a49-ac18-4773-944c-631c8df7a955"}),
    knex('games').insert({id: 9, type: 'Cards', colors: '#4CD3B4', icons: "https://firebasestorage.googleapis.com/v0/b/test-project-2e540.appspot.com/o/cards-white.png?alt=media&token=4ad90906-8ef8-4b5a-b343-8a43b3b78347"})
  )
};
