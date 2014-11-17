var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var pass = require('./api/passport')(passport); // pass passport for configuration

var users = require('./api/users.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '984g2ehkad97y3e2DFSBVCXwhr1hefhdaswryaaavadarrtwhq37vuUAHfah8yqyy2' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// TODO. refactor
var isLoggedIn = function(req, res, next){
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

var pagesdir = "public/pages/"

app.get('/', function(req, res){res.render('index.html')});
app.get('/login', function(req, res){res.sendfile(pagesdir + 'login.html')});
app.get('/signup', function(req, res){res.sendfile(pagesdir + 'signup.html')});
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  // failureFlash : true // allow flash messages // TODO. disabling right now cause we're not using flash
}));
app.post("/login", passport.authenticate('local-login', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  // failureFlash : true // allow flash messages // TODO
}))
app.get('/profile', isLoggedIn, function(req, res){res.sendfile(pagesdir + 'profile.html')});
app.get('/logout', function(req, res){req.logout(); res.redirect('/')});
app.use('/users', users);

// TODO. this dumps error to the client. not good for security
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
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
