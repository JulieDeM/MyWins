exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_game_log', function(t){
    t.increments().primary();
    t.integer('game_id').references('id').inTable('games');
    t.integer('user1_id').references('id').inTable('users');
    t.integer('user2_id').references('id').inTable('users');
    t.integer('user1_score');
    t.integer('user2_score');
    t.boolean('user1_alert');
    t.boolean('user2_alert');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_game_log');
};
