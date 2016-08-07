exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    knex('users').insert({"userName": "TRex",
      image_url: "", "firstName": "T", "lastName": "Rex", favorite_game_id: 1 }),
    knex('users').insert({"userName": "BlowinPotus",
      image_url: "http://www.frontpagemag.com/sites/default/files/uploads/2014/05/monica-lewinsky-6.jpg", "firstName": "Monica", "lastName": "Lewinsky", favorite_game_id: 2 }),
    knex('users').insert({"userName": "MrCat",
      image_url: "https://thumbs.dreamstime.com/z/mr-cat-vector-illustration-black-dressed-dinner-jacket-33055372.jpg", "firstName": "Mr", "lastName": "Cat", favorite_game_id: 3 }),
    knex('users').insert({"userName": "winnerwinner", image_url: "", "firstName": "T", "lastName": "Rex", favorite_game_id: 1 }),
    knex('users').insert({"userName": "camelCase", image_url: "", "firstName": "John", "lastName": "Doe", favorite_game_id: 4 }),
    knex('users').insert({"userName": "bestplayer", image_url: "", "firstName": "Zach", "lastName": "McPoop", favorite_game_id: 5 }),
    knex('users').insert({"userName": "WhoCares", image_url: "", "firstName": "Jess", "lastName": "Martin", favorite_game_id: 7 }),
    knex('users').insert({"userName": "UserName3", image_url: "", "firstName": "Erica", "lastName": "Johnson", favorite_game_id: 8 }),
    knex('users').insert({"userName": "inittowinit", image_url: "", "firstName": "Fartface", "lastName": "McGee", favorite_game_id: 9 }),
    knex('users').insert({"userName": "LastUser", image_url: "", "firstName": "Eric", "lastName": "Beaudoin", favorite_game_id: 3 })
  )
};
