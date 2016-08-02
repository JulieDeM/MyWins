exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_games', function(t){
    t.increments().primary();
    t.integer('user_id').references('id').inTable('users');
    t.integer('game_id').references('id').inTable('games');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_games');
};
