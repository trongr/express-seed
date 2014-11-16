process.env.NODE_ENV = "test" // need this guy so every module knows we're in test env

var expect = require('chai').should()
var request = require("supertest")

var conf = require("../conf.js")(process.env.NODE_ENV)
var app = require("../app.js")
var agent = request.agent(app)

var db = require("../models/index.js")
var conf = require("../conf.js")(process.env.NODE_ENV)

describe("users api", function(){

  before(function(done){
    db.resetmodel("User", done)
  })

  it("should be in test env", function(){
    db.name.should.equal(conf.db.name)
  })

  it("should get users", function(done){
    agent
      .get("/users")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('users')
          .instanceof(Array);
        done();
      });
  })

  it("create new user", function(done){
    agent
      .post("/users/silbermond")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('user')
          .instanceof(Object)
          .have.property("username")
          .equal("silbermond");
        done();
      });
  })

  // TODO. username unique
  // TODO. test create duplicate

  it("nonexistent user should return user null", function(done){
    agent
      .get("/users/NonexistentJoe")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('user').equal(null);
        done();
      });
  })

})
