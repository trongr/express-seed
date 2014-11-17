var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")
var path = require("path")
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

module.exports = router;
