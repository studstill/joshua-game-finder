const chai = require ('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5678;
console.log('location test. Server on port:', port);
const server = require(__dirname + '/../_server');
const Location = require(__dirname + '/../models/location');

describe('Database can add/view/remove locations', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/lfgData_test', done);
    console.log("location server open on port: " + port);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        console.log("location server closing");
        server.close(done);
      });
    });
  });

  it('should be able to POST location info', (done) => {
    request('localhost:' + port)
    .post('/api/locations')
    .send({
      name: "Place",
      city: "OZ",
      phoneNumber: "555-555-5501",
      openTime: "9AM",
      closeTime: "2AM"
    })
    .end((err, res) => {
      console.log(res.body);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('Place');
      expect(res.body.phoneNumber).to.eql('555-555-5501');
      expect(res.body.openTime).to.eql('9AM');
      done();
    })
  })

  it('should be able to GET the location info just added', (done) => {
    request('localhost:' + port)
    .get('/api/locations')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.eql('Place');
      expect(res.body[0].city).to.eql('OZ');
      done();
    })
  })

  it('should be able to update (PUT) location info', (done) => {
    request('localhost:' + port)
    .get('/api/locations')
    .end((err, res) => {
      request('localhost:' + port)
      .put('/api/locations/' + res.body[0]._id)
      .send({ 'name': 'Different Place' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.name).to.eql('Different Place');
        done();
      })
    })
  })
})
