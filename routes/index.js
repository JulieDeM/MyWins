var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf');
var Dash = require('../lib/dashlogic');
var One = require('../lib/one_v_one');
var Edit = require('../lib/editlogic');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('splashpage');
});

//Sarah's work below
//user1 requests to edit a game record
router.get('/gameRecord/:gameRecordId/edit', function(req, res, next) {
    Edit.getRecordByID(req.params.gameRecordId).then(function(record) {
        res.render('testedit', {
            record: record.rows[0]
        })
    });
});
//user1 submits edited record - alert set to true
router.post('/gameRecord/:gameRecordId', function(req, res, next) {
    Edit.editRecord(req.params.gameRecordId, req.body.user1_score, req.body.user2_score, true).then(function() {
        Edit.getUserName(req.cookies.user).then(function(user) {
            res.redirect(`/dash/${user.rows[0].userName}`)
        })
    });
});
//user2 clicked alert button next to game record
router.get('/request/:gameRecordId/edit', function(req, res, next) {
    Edit.getRecordByID(req.params.gameRecordId).then(function(record) {
        res.render('requestedit', {
            record: record.rows[0]
        })
    });
});
//user2 accepts edited game record - alert set to false
router.post('/request/:gameRecordId', function(req, res, next) {
        Edit.editRecord(req.params.gameRecordId, req.body.user1_score, req.body.user2_score, false).then(function() {
            Edit.getUserName(req.cookies.user).then(function(user) {
                res.redirect(`/dash/${user.rows[0].userName}`)
            })
        })
    })
    //change favorite game
router.post('/:id/:gameid', function(req, res, next) {
        Edit.changeFavorite(req.params.id, req.params.gameid).then(function() {
            Edit.getUserName(req.cookies.user).then(function(user) {
                res.redirect(`/dash/${user.rows[0].userName}`)
            })
        })
    })
    //End Sarah's work

// Ricky's work below
router.get('/dash/:username', function(req, res, next) {
    res.cookie('user', 1);
    var currUserID = req.cookies.user;
    Dash.readUser(req.params.username).then(function(user) {
        Dash.readGameTypes(user.rows[0].id).then(function(gametypes) {
            // for each game type, we need to get:
            // 1) Player data
            // 2) Game Records
            // 3) Standings
            Dash.readGameStats(user.rows[0].id).then(function(all) {
                // console.log("************GAME STATS**********");
                // console.log(all.rows);
                Dash.readGameRecords(user.rows[0].id).then(function(records) {
                    // console.log("************GAME RECORDS**********");
                    // console.log(records.rows);
                    res.render('testdash', {
                        currUserID: currUserID,
                        faveGame: user.rows[0].favorite_game_id,
                        userInfo: user.rows[0],
                        gameTypes: gametypes.rows,
                        gameStats: all.rows,
                        gameRecords: records.rows
                    })
                })
            })
        });
    }).timeout(2000)
});

router.post('/addrecord', function(req, res, next) {
    // console.log(">>>>>>>>>>>> req body <<<<<<<<<<<<");
    // console.log(req.body);
    var body = req.body;
    Dash.createGameRecord(
        body.game_id, body.user1_id, body.user2_id, body.user1_score, body.user2_score
    ).then(function() {
        //update players here
        Dash.readMoreGameStats(body.user1_id, body.game_id).then(function(results1) {
            Dash.readMoreGameStats(body.user2_id, body.game_id).then(function(results2) {
                var user1 = results1.rows[0];
                var user2 = results2.rows[0];
                //check if opponent has a record and rating for the current game being added
                if (results2.rows.length !== 0) {
                    var u1ExScore = One.expectedScore(user1.rating, user2.rating);
                    var u2ExScore = 1 - u1ExScore;
                    if (body.user1_score > body.user2_score) {
                        var u1AcScore = 1;
                        var u2AcScore = 0;
                    } else if (body.user1_score < body.user2_score) {
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
                    Dash.updatePlayer(updateU1, user1.user_game_id).then(function() {
                        Dash.updatePlayer(updateU2, user2.user_game_id).then(function() {
                            Dash.PlayerName(body.user1_id).then(function(player) {
                                res.redirect(`/dash/${player.rows[0].userName}`)
                            })
                        })
                    })
                } else {
                    //add user_id and game_id to user_games table
                    Dash.createPlayerGame(body.user2_id, body.game_id).then(function() {
                        //get the user_game_id from the user_games table as 'result'
                        Dash.UserGameId(body.user2_id).then(function(result) {
                            //insert a record for user2 into the user_game_stats table
                            Dash.addStats(body.user2_id, result.rows[0].id).then(function() {
                                Dash.PlayerName(body.user1_id).then(function(player) {
                                    res.redirect(`/dash/${player.rows[0].userName}`)
                                })
                            })
                        })
                    })
                }
            })
        })
    })
})

module.exports = router;
