var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")
var path = require("path")
var u = require("./utils.js")
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/index.js').models.User;

var dir = path.resolve("public/pages")

module.exports = function(passport){
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) return done(err);
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser            = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
      });
  }));

  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
      User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err) return done(err);
          if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));
          if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
          return done(null, user);
      });
  }));

  // TODO. refactor
  var isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
  }

  router
    .get('/login', function(req, res){
      res.sendFile(path.join(dir, "login.html"))
    })
    .get('/signup', function(req, res){
      res.sendFile(path.join(dir, "signup.html"))
    })
    .get("/profile", isLoggedIn, function(req, res){
      res.sendFile(path.join(dir, "profile.html"))
    })
    .post("/login", passport.authenticate('local-login', {
      successRedirect : '/auth/profile',
      failureRedirect : '/auth/login',
      failureFlash : true
    }))
    .post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/auth/profile',
      failureRedirect : '/auth/signup',
      failureFlash : true, 
    }))
    .get('/logout', function(req, res){
      req.logout();
      res.redirect('/')
    })

  return router
}
