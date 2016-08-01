exports.up = function(knex, Promise) {
  return knex.schema.createTable('game_records', function(t){
    t.increments().primary();
    t.integer('game_id').references('id').inTable('games');
    t.integer('user_id').references('id').inTable('users');
    t.integer('user1_score');
    t.integer('user2_score');
    t.boolean('alert');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('game_records');
};
