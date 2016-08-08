var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf');
var Dash = require('../lib/dashlogic');
var One = require('../lib/one_v_one');
var Two = require('../lib/two_v_two');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('FBindex');
});

// probably place all routes above /:username route, no other route files

//Julie's code starts here


//Julie's code ends here


// Ricky's work below
router.get('/:username', function(req, res, next){
  Dash.readUser(req.params.username).then(function(user){
    Dash.readGameTypes(user.rows[0].id).then(function(gametypes){
      Dash.readGameStats(user.rows[0].id).then(function(all){
        Dash.readGameRecords(user.rows[0].id).then(function(records){
          Dash.readTeams(user.rows[0].id).then(function(teams){
            Dash.readTeamRecords(user.rows[0].id).then(function(teamrecords){
              Dash.readAllTeamNames().then(function(allTeams){
                Dash.readAllUsers().then(function(allUsers){
                  res.render('dashboard_final', {
                    userInfo: user.rows[0],
                    gameTypes: gametypes.rows,
                    gameStats: all.rows,
                    gameRecords: records.rows,
                    allUsers: allUsers.rows,
                    teamStuff: teams.rows,
                    teamRecords: teamrecords.rows,
                    allTeams: allTeams.rows
                  })
                })
              })
            })
          })
        })
      })
    });
})});

router.post('/addrecord', function(req, res, next){
  Dash.createGameRecord(
    req.body.game_id, req.body.user1_id, req.body.user2_id, req.body.user1_score, req.body.user2_score
  ).then(function(){
    Dash.readMoreGameStats(req.body.user1_id, req.body.game_id).then(function(results1){
      Dash.readMoreGameStats(req.body.user2_id, req.body.game_id).then(function(results2){
        var user1 = results1.rows[0];
        var user2 = results2.rows[0];
        var updatedPlayers = One.runMath(user1, user2, req.body.user1_score, req.body.user2_score)
        Dash.updatePlayer(updatedPlayers[0], user1.user_game_id).then(function(){
          Dash.updatePlayer(updatedPlayers[1], user2.user_game_id).then(function(){
            console.log(req.body.user1_id);
            Dash.readUserId(req.body.user1_id).then(function(userStuff){
              console.log(userStuff);
              var userName = userStuff.rows[0].userName;
              console.log(userName);
              res.redirect('/' + userName)
            })
          })
        })
      })
    })
  })
});

router.post('/addteamrecord', function(req, res, next){
  Dash.createGameRecordTeam(
    req.body.game_id, req.body.team1_id, req.body.team2_id, req.body.team1_score, req.body.team2_score
  ). then(function(){
    Dash.readTeamStats(req.body.team1_id, req.body.game_id).then(function(results1){
      Dash.readTeamStats(req.body.team2_id, req.body.game_id).then(function(results2){
        var team1 = results1.rows[0];
        var team2 = results2.rows[0];
        var updatedTeams = Two.runMath(team1, team2, req.body.team1_score, req.body.team2_score);
        Dash.updateTeam(updatedTeams[0], team1.team_game_id).then(function(){
          Dash.updateTeam(updatedTeams[1], team2.team_game_id).then(function(){
            Dash.readTeamId(req.body.team1_id).then(function(teamStuff){
              res.redirect('/' + teamStuff.rows[0].name)

            })
          })
        })
      })
    });
  })
});

module.exports = router;
