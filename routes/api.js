var express = require('express');
var router = express.Router();
var debug = require("debug")("express101")

// todo. will need to have different modules for different end points

router.get('/', function(req, res) {
    debug("debugging the shim out of this engine!")
    res.send('responding with some api resource');
});

module.exports = router;
