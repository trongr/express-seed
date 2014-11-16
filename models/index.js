var debug = require("debug")("express101")
var mongoose = require('mongoose');
var user = require("./user.js")

mongoose.connect('mongodb://localhost/' + (process.env.DB || "market")); // put DB=markettest for tests

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected to mongo db market");
});
