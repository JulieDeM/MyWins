var knex = require('../db/knex');

module.exports = {
  findUser: function(user){
    return knex.raw(`SELECT * from users WHERE fb_uid = '${user.id}'`)
  },
  addUser: function(user){
    var photo = user.photos[0].value;
    return knex.raw(`INSERT into users ("firstName", "lastName", "image_url", "fb_uid") values ('${user.name.givenName}', '${user.name.familyName}', '${photo}', '${user.id}')`)
  }
}
