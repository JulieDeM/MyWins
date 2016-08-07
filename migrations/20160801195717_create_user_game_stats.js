exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_game_stats', function(t){
    t.increments().primary();
    t.integer('user_id').references('id').inTable('users');
    t.integer('user_game_id').references('id').inTable('user_games');
    t.integer('gamesPlayed');
    t.integer('rating');
    t.integer('constant');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_game_stats');
};
