process.env.NODE_ENV = "test" // need this guy so index.js knows we're in test env

var expect = require('chai').should()
var mongoose = require("mongoose")

var db = require("./index.js")
var User = db.models.User
var conf = require("../conf.js")(process.env.NODE_ENV)

describe("user model:", function(){

  var email = "john"
  var password = "password"

  before(function(done){
    db.resetmodel("User", done)
  })

  // not dropping db in case you want to verify the result by hand, e.g. in mongo terminal
  // after(function(){
  //   // drop the db for the next test suite. could use resetmodel here too
  //   mongoose.connection.db.dropDatabase()
  // })

  it("should be in test env", function(){
    db.name.should.equal(conf.db.name)
  })

  it("User model should be empty cause we just cleared it", function(done){
    User.count({}, function(er, count){
      count.should.equal(0)
      done(er)
    })
  })

  it("should save user model", function(done){
    new User({local:{email:email, password:password}}).save(function(er, user){
      user.should.have.property("local")
        .have.property("email").equal(email)
      done(er)
    })
  })

})
