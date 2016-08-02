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
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var unirest = require('unirest');

var app = express();

// view engine setup
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
    callbackURL: process.env.HOST + "/auth/facebook/callback"
  },
  function(token, tokenSecret, profile, done) {
    unirest.get('https://graph.facebook.com/v2.7/me?access_token=EAACEdEose0cBAFzT5hGIZADg39PVhnV1qxZCp8KWgdyjXpKcANFxfon7H6brnKT1tYEib2e7NQwh8mCFcHNzp1Kwlt3aZB1QnwJTcxwJkBINtURDZBmWGzpcx8Al6AfhEEDKYAtuowBUDTyJLQ2BmzZBbGEr6RnMqZCbUbhhlmlwZDZD')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send({ "parameter": 23, "foo": "bar" })
  .end(function (response) {
    console.log(response.body);
  });
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead (so perform a knex query here later.)
    done(null, profile)
  }
));
// above app.use('/', routes);...
passport.serializeUser(function(user, done) {
 // later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, user)
});

app.use('/', routes);
app.use('/', authRoutes);
app.use('/signup', signup);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
