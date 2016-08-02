var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'public_profile'
}));

router.get('/auth/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user: req.user
    });
});
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }));
router.get('/auth/logout', function(req, res) {
    req.logout();
    req.session.destroy(function(err) {
        res.redirect('/');
    });
})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
