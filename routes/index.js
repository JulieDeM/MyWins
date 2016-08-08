var express = require('express');
var router = express.Router();
var Dash = require('../lib/dashlogic');
var One = require('../lib/one_v_one');
var Two = require('../lib/two_v_two');
var Edit = require('../lib/editlogic');
var Dashboard = require('../lib/queries')
var Val = require('../lib/formValidation')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('splashpage');
});
router.post('/validate', function(req, res, next) {
    var validate = Val.validateUsername(req.body)
    switch (validate) {
        case "blank":
            res.redirect('/noUserName');
            break;
        case "illegal":
            res.redirect('/invalidUserName');
            break;
        case "nosport":
            res.redirect('/noSport')
        case "no error":
            Dashboard.findUser(req.body.name).then(function(result) {
                if (result.rows.length == 0) {
                    //find user ID based on FB id in cookies
                    Dashboard.findUserId(req.cookies.user).then(function(userID) {
                        //if not, add to users table in database
                        Dashboard.updateUser(req.body.name, req.body.sport, req.cookies.user).then(function() {
                            //then use that Id and the game id from req.body to add user game record
                            Dashboard.addUserGame(userID.rows[0].id, req.body.sport).then(function() {
                                //then find userGameId of record just added
                                Dashboard.findUserGameId(userID.rows[0].id).then(function(userGameId) {
                                    //then add a userGameStats record
                                    Dashboard.addUserGameStats(userID.rows[0].id, userGameId.rows[0].id, 0, 100, 40).then(function() {})
                                })
                            })
                        })
                        res.redirect('/loading')
                    })
                } else {
                    console.log("That username has been taken!");
                    res.redirect('/takenUserName')
                }
            })
            break;
    }
});
router.get('/noUserName', function(req, res, next) {
    res.render('pageafterfb', {
        message: "Please enter a username!"
    })
})
router.get('/takenUserName', function(req, res, next) {
    res.render('pageafterfb', {
        message: "Sorry, this username has been taken!"
    })
})
router.get('/invalidUserName', function(req, res, next) {
    res.render('pageafterfb', {
        message: "Username can only contain lowercase letters, numbers, and underscores."
    })
})
router.get('/noSport', function(req, res, next) {
    res.render('pageafterfb', {
        message: "Please choose a sport!"
    })
})
router.get('/loading', function(req, res, next) {
    Dashboard.readUser(req.cookies.user).then(function(output) {
        var info = output.rows[0]
        var photo = info.image_url.replace('$1', '?');
        res.render('loadpage', {
            photo: photo,
            firstName: info.firstName,
            lastName: info.lastName,
            userName: info.userName
        });
    })
});
//posting team game form to database
router.post('/addgametype', function(req, res, next) {
        Dash.createGameType(req.body.user1_id, req.body.sport).then(function() {
          Edit.getUserName(req.cookies.user).then(function(user) {
              res.redirect(`/${user.rows[0].userName}`)
          })
        })
    })
router.post('/addgametypeteam', function(req, res, next) {
  Dash.createGameTypeTeam(req.body.user1_id, req.body.user2_id, req.body.teamName, req.body.sport).then(function() {
    Dash.getTeamId(req.body.teamName).then(function(id){
      Dash.createTeamGameID(id.rows[0].id, req.body.sport).then(function(){
        Edit.getUserName(req.cookies.user).then(function(user) {
        res.redirect(`/${user.rows[0].userName}`)
          })
        })
      })
    })
  })

    //change favorite game
router.post('/:id/:gameid', function(req, res, next) {
        Edit.changeFavorite(req.params.id, req.params.gameid).then(function() {
            Edit.getUserName(req.cookies.user).then(function(user) {
                res.redirect(`/${user.rows[0].userName}`)
            })
        })
    })

    // Ricky's work below
 router.get('/:username', function(req, res, next) {
     var currUserID = req.cookies.user;
     Dash.readUser(req.params.username).then(function(user) {
         Dash.readGameTypes(user.rows[0].id).then(function(gametypes) {
             Dash.readGameStats(user.rows[0].id).then(function(all) {
                 Dash.readGameRecords(user.rows[0].id).then(function(records) {
                     Dash.readTeams(user.rows[0].id).then(function(teams) {
                         Dash.readTeamRecords(user.rows[0].id).then(function(teamrecords) {
                             Dash.readAllTeamNames().then(function(allTeams) {
                                 Dash.readAllUsers().then(function(allUsers) {
                                   Dash.readSingleGameStandings().then(function(singleStandings){
                                     Dash.readTeamGameStandings().then(function(teamStandings){
                                       var input = user.rows[0].image_url;
                                       var photo = input.replace('$1', '?');
                                     res.render('dash', {
                                        photo: photo,
                                         currUserID: currUserID,
                                         faveGame: user.rows[0].favorite_game_id,
                                         userInfo: user.rows[0],
                                         gameTypes: gametypes.rows,
                                         gameStats: all.rows,
                                         gameRecords: records.rows,
                                         allUsers: allUsers.rows,
                                         teamStuff: teams.rows,
                                         teamRecords: teamrecords.rows,
                                         allTeams: allTeams.rows,
                                         singleStandings: singleStandings.rows,
                                         teamStandings: teamStandings.rows
                                     })
                                 })
                             })
                         })
                     })
                 })
                })
              })
             })
         });
     })
 });

router.post('/addrecord', function(req, res, next) {
    Dash.createGameRecord(
        req.body.game_id, req.body.user1_id, req.body.user2_id, req.body.user1_score, req.body.user2_score
    ).then(function() {
        Dash.readMoreGameStats(req.body.user1_id, req.body.game_id).then(function(results1) {
            Dash.readMoreGameStats(req.body.user2_id, req.body.game_id).then(function(results2) {
                var user1 = results1.rows[0];
                var user2 = results2.rows[0];
                if (results2.rows.length !== 0) {
                    var updatedPlayers = One.runMath(user1, user2, req.body.user1_score, req.body.user2_score)
                    Dash.updatePlayer(updatedPlayers[0], user1.user_game_id).then(function() {
                        Dash.updatePlayer(updatedPlayers[1], user2.user_game_id).then(function() {
                            Dash.readUserId(req.body.user1_id).then(function(userStuff) {
                                var userName = userStuff.rows[0].userName;
                                res.redirect('/' + userName)
                            })
                        })
                    })
                } else {
                    //add user_id and game_id to user_games table
                    Dash.createPlayerGame(req.body.user2_id, req.body.game_id).then(function() {
                        //get the user_game_id from the user_games table as 'result'
                        Dash.UserGameId(req.body.user2_id).then(function(result) {
                            //insert a record for user2 into the user_game_stats table
                            Dash.addStats(req.body.user2_id, result.rows[0].id).then(function() {
                                Dash.PlayerName(req.body.user1_id).then(function(player) {
                                    res.redirect(`/${player.rows[0].userName}`)
                                })
                            })
                        })
                    })
                }
            })
        })
    })
});
router.post('/addteamrecord', function(req, res, next) {
    Dash.createGameRecordTeam(
        req.body.game_id, req.body.team1_id, req.body.team2_id, req.body.team1_score, req.body.team2_score
    ).then(function() {
        Dash.readTeamStats(req.body.team1_id, req.body.game_id).then(function(results1) {
            Dash.readTeamStats(req.body.team2_id, req.body.game_id).then(function(results2) {
                var team1 = results1.rows[0];
                var team2 = results2.rows[0];
                var updatedTeams = Two.runMath(team1, team2, req.body.team1_score, req.body.team2_score);
                Dash.updateTeam(updatedTeams[0], team1.team_game_id).then(function() {
                    Dash.updateTeam(updatedTeams[1], team2.team_game_id).then(function() {
                        Dash.readTeamId(req.body.team1_id).then(function(teamStuff) {
                            res.redirect('/' + teamStuff.rows[0].name)
                        })
                    })
                })
            })
        });
    })
});
module.exports = router;
