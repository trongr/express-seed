var debug = require("debug")("express101")
var mongoose = require('mongoose');
var User = require("./user.js")
var conf = require("../conf.js")(process.env.NODE_ENV)

mongoose.connect('mongodb://localhost/' + conf.db.name, function(er){
  if (er) throw er
  console.log(conf.db.name + ": mongoose connected")
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log(conf.db.name + ": db open");
});

module.exports = {
  User: User
}
