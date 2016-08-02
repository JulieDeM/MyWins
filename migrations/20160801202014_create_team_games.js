exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_games', function(t){
    t.increments().primary();
    t.integer('team_id').references('id').inTable('teams');
    t.integer('game_id').references('id').inTable('games');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team_games');
};
