var debug = require("debug")("express101")
var mongoose = require('mongoose');
var User = require("./user.js")
var conf = require("../conf.js")(process.env.NODE_ENV)

mongoose.connect('mongodb://localhost/' + conf.db.name, {
    server: {
      socketOptions: {
        keepAlive: 1, // TODO. might also need this for replset.socketOptions. see mongoose docs for details
      }
    }
}, function(er){
  if (er) throw er
  console.log("mongoose connected: " + conf.db.name)
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("db opened: " + conf.db.name);
});

module.exports = (function(){
  var db = {
    name: conf.db.name, // useful for tests, e.g. so we know which database we're dropping
  }

  db.models = {
    User: User
  }

  // clean up collection, e.g. for testing. don't use in production!
  // TODO. mongoose has a dropdatabase method i think
  db.resetmodel = function(model, done){
    db.models[model].remove({}, function(er){
      if (er) return done({er:er, d:model, msg:"db resetmodel"})
      done()
    })
  }

  return db
}());
