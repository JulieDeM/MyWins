exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(t){
    t.increments().primary();
    t.string('type');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
