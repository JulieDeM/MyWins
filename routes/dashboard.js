var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')
var Dashboard = require('../lib/queries')
var Val = require('../lib/formValidation')

router.get('/', function(req, res, next){
      res.render('splashpage');
})

router.post('/', function(req, res, next){
  console.log("R^&$%R&FJ&%R&CRTRT&KRTUKRURTUKRRFY&&&^^^^%%%%%%%%%%%%");

  console.log(req.cookies.user);
  var validate = Val.validateUsername(req.body)
  switch(validate){
    case "blank":
      res.render('dash', {message: "Please enter a username!"})
      break;
    case "illegal":
      res.render('dash', {message: "Username can only contain lowercase letters, numbers, and underscores."})
      break;
    case "nosport":
      res.render('dash', {message2: "Please choose a sport!"})
    case "no error":
      Dashboard.findUser(req.body.name).then(function(result){
        if (result.rows.length == 0) {
          //find user ID based on FB id in cookies
          Dashboard.findUserId(req.cookies.user).then(function(userID){
            //if not, add to users table in database
            Dashboard.updateUser(req.body.name, req.body.sport, req.cookies.user).then(function(){
                //then use that Id and the game id from req.body to add user game record
                Dashboard.addUserGame(userID.rows[0].id, req.body.sport).then(function(){
                  //then find userGameId of record just added
                  Dashboard.findUserGameId(userID.rows[0].id).then(function(userGameId){
                    //then add a userGameStats record
                    Dashboard.addUserGameStats(userID.rows[0].id, userGameId.rows[0].id, 0, 100, 40).then(function(){
                    })
                  })
                })
            })
            res.redirect('/auth/profile')
          })
        }else{
          console.log("That username has been taken!");
          res.render('dash', {message: "Sorry, this username has been taken!"})
        }
      })
        break;
    }
  });




module.exports = router;
