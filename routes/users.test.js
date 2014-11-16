process.env.NODE_ENV = "test" // need this guy so every module knows we're in test env

var expect = require('chai').should()
var request = require("supertest")

var conf = require("../conf.js")(process.env.NODE_ENV)
var app = require("../app.js")
var agent = request.agent(app)

describe("users api", function(){

  it("get /users should return json", function(done){
    agent
      .get("/users")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('users').and.be.instanceof(Array);
        done();
      });
  })

})
