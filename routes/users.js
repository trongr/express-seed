var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    debug("debugging the shim out of this engine!")
    res.send({users:["blah", "asdf"]})
});

module.exports = router;
