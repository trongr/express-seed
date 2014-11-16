var expect = require('chai').should()
var mongoose = require("mongoose")
process.env.NODE_ENV = "test" // need this guy so index.js knows we're in test env
var db = require("./index.js")
var User = db.User

describe("model index", function(){

  var username = "john"
  var password = "password"

  beforeEach(function(){

  })

  it("should be in test env", function(done){
    done()
  })

  it("should save user model", function(done){
    new User({username:username, password:password}).save(function(er, user){
      if (er) return done(er)
      user.should.have.property("username").equal(username)
      done()
    })
  })

})
