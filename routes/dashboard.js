var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')
var Dashboard = require('../lib/queries')

router.get('/', function(req, res, next){
      res.render('dashboard');
})

router.post('/', function(req, res, next){
  //check if user exists in database
      Dashboard.findUser(req.body.name).then(function(result){
        if (result.rows.length == 0) {
          //if not, add to users table in database
          Dashboard.addUserInfo(req.body.name, req.body.sport).then(function(){
            //then find Id of record just added to users
            Dashboard.findUserId(req.body.name).then(function(userId){
              //then use that Id and the game id from req.body to add user game record
              Dashboard.addUserGame(userId.rows[0].id, req.body.sport).then(function(){
                //then find userGameId of record just added
                Dashboard.findUserGameId(userId.rows[0].id).then(function(userGameId){
                  //then add a userGameStats record
                  Dashboard.addUserGameStats(userId.rows[0].id, userGameId.rows[0].id, 0, 100, 40).then(function(){
                  })
                })
              })
            })
            res.redirect('/')
          })
        }else{
          console.log("That username has been taken!");
        }
      })
    });

module.exports = router;
