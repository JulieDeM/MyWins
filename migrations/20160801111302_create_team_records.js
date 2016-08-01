exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_records', function(t){
    t.increments().primary();
    t.integer('game_id').references('id').inTable('games');
    t.integer('team_id').references('id').inTable('teams');
    t.integer('team1_score');
    t.integer('team2_score');
    t.boolean('alert');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team_records');
};
