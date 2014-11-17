process.env.NODE_ENV = "test" // need this guy so every module knows we're in test env

var expect = require('chai').should()
var request = require("supertest")
var async = require("async")

var conf = require("../conf.js")(process.env.NODE_ENV)
var app = require("../app.js")
var agent = request.agent(app)

var mongoose = require("mongoose")
var db = require("../models/index.js")
var conf = require("../conf.js")(process.env.NODE_ENV)

describe("users api:", function(){

  before(function(done){
    db.resetmodel("User", done)
  })

  // after(function(){
  //   mongoose.connection.db.dropDatabase()
  // })

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

  it("should get nonempty users", function(done){
    agent
      .get("/users")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('users')
          .instanceof(Array)
          .length(1);
        done();
      });
  })

  it("create duplicate user should return error", function(done){
    agent
      .post("/users/silbermond")
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it("removing existing user should be ok", function(done){
    agent
      .del("/users/silbermond")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('count')
          .equal(1);
        done();
      })
  })

  it("removing nonexisting user should return count 0", function(done){
    agent
      .del("/users/silbermond")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('count')
          .equal(0);
        done();
      })
  })

})
