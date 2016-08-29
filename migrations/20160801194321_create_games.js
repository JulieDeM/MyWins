exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(t){
    t.integer('id');
    t.string('type');
    t.string('colors');
    t.string('icons');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
