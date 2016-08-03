var knex = require('../db/knex');

module.exports = {
  addUser: function(user){
    return knex.raw(`INSERT into users ("firstName", "lastName", "image_url", "fb_uid") values ('${user.name.givenName}', '${user.name.familyName}', '${user.photos[0].value}', '${user.id}')`)
  }
}
