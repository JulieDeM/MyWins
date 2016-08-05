exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t){
    t.increments().primary();
    t.string('userName');
    t.text('image_url');
    t.string('firstName');
    t.string('lastName');
    t.string('fb_uid');
    t.integer('favorite_game_id').references('id').inTable('games');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
