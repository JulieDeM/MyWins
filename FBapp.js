require('dotenv').config({silent: true});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var signup = require('./routes/signup');
var dashboard = require('./routes/dashboard');
var authRoutes = require('./routes/auth');
var newgametypes = require('./routes/newgametypes')
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var Signup = require('./lib/signup');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2],
  secret: 'asdfkjl',
  resave: false,
  saveUninitialized: true
 }))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/facebook/callback",
    redirect: false,
    profileFields: ['id', 'name', 'picture.type(large)']
  },
  function(token, tokenSecret, profile, done) {
    Signup.findUser(profile).then(function(user){
     if (user.rows.length !== 0) {
        done(null, profile);
      } else {
       Signup.addUser(profile).then(function(){
         done(null, profile);
       })
     }
    })
  }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user)
});

app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/signup', signup);
app.use('/dashboard', dashboard);
app.use('/:username', newgametypes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
