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
      // console.log("************GAME TYPES**********");
      // console.log(gametypes.rows);

    // for each game type, we need to get:
    // 1) Player data
    // 2) Game Records
    // 3) Standings
      Dash.readGameStats(user.rows[0].id).then(function(all){
        // console.log("************GAME STATS**********");
        // console.log(all.rows);
        Dash.readGameRecords(user.rows[0].id).then(function(records){
          // console.log("************GAME RECORDS**********");
          // console.log(records.rows);
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
        // console.log("-------------ONE---------");
        // console.log(results1.rows);
        // console.log("-------------TWO---------");
        // console.log(results2.rows);
        var user1 = results1.rows[0];
        var user2 = results2.rows[0];
        var u1ExScore = One.expectedScore(user1.rating, user2.rating);
        var u2ExScore = 1 - u1ExScore;
        if (req.body.user1_score > req.body.user2_score){
          var u1AcScore = 1;
          var u2AcScore = 0;
        } else if (req.body.user1_score < req.body.user2_score){
          var u1AcScore = 0;
          var u2AcScore = 1;
        } else {
          var u1AcScore = 0.5;
          var u2AcScore = 0.5;
        }
        var u1newRating = One.newRating(user1.rating, user1.constant, u1ExScore, u1AcScore);
        var u2newRating = One.newRating(user2.rating, user2.constant, u2ExScore, u2AcScore);
        var updateU1 = {
          gamesPlayed: user1.gamesPlayed + 1,
          rating: u1newRating,
          constant: One.checkConstant(user1.constant, u1newRating, (user1.gamesPlayed + 1))
        };
        var updateU2 = {
          gamesPlayed: user2.gamesPlayed + 1,
          rating: u2newRating,
          constant: One.checkConstant(user2.constant, u2newRating, (user2.gamesPlayed + 1))
        };
        // console.log("-------------ONE---------");
        // console.log(updateU1);
        // console.log("-------------TWO---------");
        // console.log(updateU2);
        Dash.updatePlayer(updateU1, user1.user_game_id).then(function(){
          Dash.updatePlayer(updateU2, user2.user_game_id).then(function(){
            res.redirect('/')

          })
        })



      })
    })
  })
})

module.exports = router;
