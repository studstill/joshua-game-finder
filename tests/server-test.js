var fs               = require('fs');
var chai             = require('chai');
var mocha            = require('mocha');
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

describe('Users REST API', function() {

  before(function(done) {
    testSave = new User({
      username: 'uncletester',
      password: 'password321',
      email: 'uncletester@email.com',
      firstName: 'Uncle',
      lastName: 'Tester',
      city: 'Seattle',
      state: 'WA'
    });

    testSave.save(function(err, data) {
      if (err) throw err;
      testSave = data;
      done();
    });
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
      .get('/users/sirtestsalot')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to a DELETE /users/:user by deleting that user', function(done) {
    chai.request('localhost:3000')
      .del('/users/sirtestsalot')
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
