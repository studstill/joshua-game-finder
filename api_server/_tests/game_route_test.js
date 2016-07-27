const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5678;
console.log('game route. Test server on port: ', port);
const server = require(__dirname + '/../_server');
const Game = require(__dirname + '/../models/game');

describe('Database can add/view/remove games', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/lfgData_test', done);
    console.log('game server on port: ', port);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        console.log("game server closing");
        server.close(done);
      });
    });
  });

  it('should be able to POST game info', (done) => {
    request('localhost:' + port)
    .post('/api/games')
    .send({
      name: "test game",
      description: "best game ever!",
      duration: 100,
      minPlayers: 2,
      maxPlayers: 20
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('test game');
      expect(res.body.duration).to.eql(100);
      expect(res.body.maxPlayers).to.eql(20);
      done();
    })
  })

  it('should GET the game info just added', (done) => {
    request('localhost:' + port)
    .get('/api/games')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.eql('test game');
      expect(res.body[0].description).to.eql('best game ever!');
      expect(res.body[0].minPlayers).to.eql(2);
      done();
    })
  })

  it('should be able to update (PUT) game info', (done) => {
    request('localhost:' + port)
    .get('/api/games')
    .end((err, res) => {
      request('localhost:' + port)
      .put('/api/games/' + res.body[0]._id)
      .send({ 'name': 'CHANGED' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.name).to.eql('CHANGED');
        done();
      })
    })
  })
})
