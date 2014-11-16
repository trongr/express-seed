var expect = require('chai').should()
var User = require("./user.js")

describe("user model", function(){

  var username = "john"
  var password = "password"

  beforeEach(function(){

  })

  it("should create a user", function(){
    var user1 = new User({username:username, password:password})
    user1.should.have.property("username").equal(username)
    user1.should.have.property("password").equal(password)
    user1.should.have.property("created")
    user1.should.have.property("updated")
  })

  // todo
  it("should throw error when no username default", function(){

  })
})
