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
    console.log(user.rows[0].id);
    Dash.readGameTypes(user.rows[0].id).then(function(gametypes){
    //   console.log(gametypes);
    //   res.render('testdash', {
    //     userInfo: user.rows[0],
    //     games: gametypes.rows
    // })
    // for each game type, we need to get:
    // 1) Player data
    // 2) Game Records
    // 3) Standings
    for(var i=0; i<gametypes.rows.length; i++){
      Dash.readGameStats(gametypes.rows[i].id)

    }
});
})});

module.exports = router;
