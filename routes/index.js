var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf');
var Dash = require('../lib/dashlogic');
var One = require('../lib/one_v_one');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// probably place all routes above /:username route, no other route files

//Julie's code starts here


//Julie's code ends here


// Ricky's work below
router.get('/:username', function(req, res, next){
  Dash.readUser(req.params.username).then(function(user){
    Dash.readGameTypes(user.rows[0].id).then(function(gametypes){
      console.log("************GAME TYPES**********");
      console.log(gametypes.rows);
    //   res.render('testdash', {
    //     userInfo: user.rows[0],
    //     games: gametypes.rows
    // })
    // for each game type, we need to get:
    // 1) Player data
    // 2) Game Records
    // 3) Standings
      Dash.readGameStats(user.rows[0].id).then(function(all){
        // console.log("************GAME STATS**********");
        // console.log(all.rows);
        Dash.readGameRecords(user.rows[0].id).then(function(records){
          console.log("************GAME RECORDS**********");
          console.log(records.rows);
            res.render('testdash', {
              userInfo: user.rows[0],
              gameTypes: gametypes.rows,
              gameStats: all.rows,
              gameRecords: records.rows
          })
        })
      })
});
})});

router.post('/addrecord', function(req, res, next){
  // console.log(">>>>>>>>>>>> req body <<<<<<<<<<<<");
  // console.log(req.body);
  Dash.createGameRecord(
    req.body.game_id, req.body.user1_id, req.body.user2_id, req.body.user1_score, req.body.user2_score
  ).then(function(){
    //update players here
    Dash.readMoreGameStats(req.body.user1_id, req.body.game_id).then(function(results1){
      Dash.readMoreGameStats(req.body.user2_id, req.body.game_id).then(function(results2){
        console.log("-------------ONE---------");
        console.log(results1.rows);
        console.log("-------------TWO---------");
        console.log(results2.rows);
        // results not getting me the game type, just user_game_id



        res.redirect('/')
      })
    })
  })
})

module.exports = router;
