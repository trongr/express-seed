var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")
var User = require("../models/index.js").models.User
var u = require("./utils.js")

router.use(function(req, res, next) {
	// do logging
	console.log('this is a middleware. do something here');
	next();
});

// TODO. validation middleware

router.route('/')
	.get(function(req, res) {
		User.find(function(er, users){
			// TODO. check what client sees and hide server stacktrace
			u.send(res, er, {users:users})
		})
	})

router.route('/:username')
	.get(function(req, res) {
		User.findOne({username:req.params.username}, function(er, user){
			u.send(res, er, {user:user})
		})
	})
	.post(function(req, res) {
		var user = new User({
			username: req.params.username,
			password: req.body.password
		})
		user.save(function(er, nuser){
			u.send(res, er, {user:user})
		})
	})
	.put(function(req, res) {
		res.send({user:"todo"})
	})
	.delete(function(req, res) {
		User.remove({
			username: req.params.username
		}, function(er, count){
			u.send(res, er, {count:count})
		})
	})

module.exports = router;
