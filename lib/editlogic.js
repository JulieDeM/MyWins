var knex = require('../db/knex');

module.exports = {
  PlayerName: function(user_id){
    return knex.raw(`SELECT * from users WHERE id = ${user_id}`)
  },
  getRecordByID: function(record_id){
    return knex.raw(`SELECT * from user_game_log WHERE id = ${record_id}`)
  },
  editRecordAlert: function(record_id, value){
    return knex.raw(`UPDATE user_game_log SET alert = ${value} WHERE id = ${record_id}`)
  },
  editRecord: function(record_id, score1, score2, value){
    return knex.raw(`UPDATE user_game_log
      SET alert = ${value}, user1_score = ${score1}, user2_score = ${score2}
      WHERE id = ${record_id}`)
  },
  getUserName: function(id){
    return knex.raw(`SELECT * from users WHERE fb_uid = '${id}'`)
  }
}
