exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_game_log', function(t){
    t.increments().primary();
    t.integer('game_id').references('id').inTable('games');
    t.integer('team1_id').references('id').inTable('teams');
    t.integer('team2_id').references('id').inTable('teams');
    t.integer('team1_score');
    t.integer('team2_score');
    t.boolean('user1_alert');
    t.boolean('user2_alert');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team_game_log');
};
