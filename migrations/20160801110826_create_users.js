exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t){
    t.increments().primary();
    t.string('userName');
    t.string('image_url');
    t.integer('games_played');
    t.integer('current_rating');
    t.integer('constant');
    t.integer('game_id').references('id').inTable('games');
    t.integer('favorite_game').references('id').inTable('games');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
