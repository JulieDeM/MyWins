var express = require('express');
var router = express.Router();
var bookshelf = require('../db/bookshelf')
var Dashboard = require('../lib/queries')

router.get('/', function(req, res, next){
      res.render('dashboard');
})

router.post('/', function(req, res, next){
      Dashboard.findUser(req.body.name).then(function(result){
        if (result.rows.length == 0) {
          Dashboard.addUserInfo(req.body.name, req.body.sport).then(function(newUser){
            console.log("check database");
            res.redirect('/')
          })
        }else{
          console.log("That username has been taken!");
        }
      })
    });

module.exports = router;
