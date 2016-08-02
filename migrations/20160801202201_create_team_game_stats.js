exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_game_stats', function(t){
    t.increments().primary();
    t.integer('team_game_id').references('id').inTable('team_games');
    t.integer('gamesPlayed');
    t.integer('teamRating');
    t.integer('teamConstant');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team_game_stats');
};
