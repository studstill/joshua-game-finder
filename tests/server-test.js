var fs               = require('fs');
var chai             = require('chai');
var mocha            = require('mocha');
var User             = require(__dirname + '/../models/User');
var Instance         = require(__dirname +'/../models/Instance')
var server           = require(__dirname + '/../server');
var chaiHttp         = require('chai-http');
var mongoose         = require('mongoose');
var expect           = chai.expect;
process.env.MONGOURI = 'mongodb://localhost/game_test';
chai.use(chaiHttp);

var testUser = {
  username: 'sirtestsalot',
  password: 'password123',
  email: 'sirtestsalot@email.com',
  firstName: 'Sirtests',
  lastName: 'Alot',
  city: 'Seattle',
  state: 'WA'
};

var testInstance = {
  host: 'Me',
  game: 'Go Fish',
  location: 'There',
  playersNeeded: '2',
  signedUp: '1',
  startTime: '14:00',
  playTime: '2hrs',
  gameOver: false
};

describe('Users REST API', function() {

  before(function(done) {
    testUser = new User({
      username: 'uncletester',
      password: 'password321',
      email: 'uncletester@email.com',
      firstName: 'Uncle',
      lastName: 'Tester',
      city: 'Seattle',
      state: 'WA'
    });

    testUser.save(function(err, data) {
      if (err) throw err;
      testUser = data;
    });
      done();
  });

  it('should respond to GET /users by returning list of all users', function(done) {
    chai.request('localhost:3000')
      .get('/api/users')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to POST /users by storing and returning a user', function(done) {
    chai.request('localhost:3000')
      .post('/api/users')
      .send(testUser)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to GET /users/:user that user\'s info', function(done) {
    chai.request('localhost:3000')
      .get('/api/users/sirtestsalot')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to a DELETE /users/:user by deleting that user', function(done) {
    chai.request('localhost:3000')
      .del('/api/users/sirtestsalot')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

});

describe('Instances REST API', function() {
  testId = '';
  before(function(done) {
    testInstance = new Instance({
      host: 'Tester',
      game: 'game',
      location: 'Here',
      playersNeeded: '1',
      signedUp: '0',
      startTime: '14:00',
      playTime: '2hrs',
      gameOver: false
    });

    testInstance.save(function(err, data) {
      if (err) throw err;
      testInstance = data;
      testId = testInstance._id;
    });
      done();
  });

  it('should respond to GET /instances by returning list of all instances', function(done) {
    chai.request('localhost:3000')
      .get('/api/instances')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to POST /instances by storing and returning a instance', function(done) {
    chai.request('localhost:3000')
      .post('/api/instances')
      .send(testUser)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to GET /instances/:instance that instance\'s info', function(done) {
    chai.request('localhost:3000')
      .get('/api/instances/testId')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to a DELETE /instances/:instance by deleting that instance', function(done) {
    chai.request('localhost:3000')
      .del('/api/instances/testId')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

});
