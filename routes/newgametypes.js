var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf');
var Dash = require('../lib/dashlogic');
var One = require('../lib/one_v_one');
var queries = require('../lib/queries');

//posting individual game form to database
router.post('/', function(req, res, next){
  Dash.createGameType(req.body.userid, req.body.sport).then(function(){
      res.redirect('/:username')
    })
})
//posting team game form to database
// router.post('/', function(req,res,next){
// })
//route was added to read the game standings by desc
router.get('/:username', function(req, res, next){
  Dash.readUser(req.params.username).then(function(user){
    Dash.readGameTypes(user.rows[0].id).then(function(gametypes){
      Dash.readGameStats(user.rows[0].id).then(function(all){
        Dash.readGameRecords(user.rows[0].id).then(function(records){
          Dash.readGameStandings(user.rows[0].id).then(function(standing){
            res.render('gamestandings', {
              userInfo: user.rows[0],
              gameTypes: gametypes.rows,
              gameStats: all.rows,
              gameRecords: records.rows,
              standing: standing.rows
            })
          })
          console.log(userInfo);
          console.log(gameTypes);
        })
      })
    });
  })
});

module.exports = router;
