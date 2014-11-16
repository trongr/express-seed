var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")

router.get('/', function(req, res) {
    debug("debugging the shim out of this engine!")
    res.send('responding with some user resource');
});

module.exports = router;
