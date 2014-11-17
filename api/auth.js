var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")
var path = require("path")
var passport = require("passport")
var u = require("./utils.js")

var dir = path.resolve("public/pages")

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
    successRedirect : '/auth/profile', // redirect to the secure profile section
    failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages // TODO
  }))
  .post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/auth/profile', // redirect to the secure profile section
    failureRedirect : '/auth/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages // TODO. disabling right now cause we're not using flash
  }))
  .get('/logout', function(req, res){
    req.logout();
    res.redirect('/')
  })

module.exports = router;
