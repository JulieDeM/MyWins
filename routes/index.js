var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf');
var Dash = require('../lib/dashlogic');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// probably place all routes above /:username route, no other route files

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
        console.log("************GAME STATS**********");
        console.log(all.rows);
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
    // for(var i=0; i<gametypes.rows.length+1; i++){
    //   Dash.readGameStats(gametypes.rows[i].id).then(function(stats){
    //     console.log("********"+i+"*******");
    //     console.log(stats);
    //   })
    //
    // }
});
})});

module.exports = router;
