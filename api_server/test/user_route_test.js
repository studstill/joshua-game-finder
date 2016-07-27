const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5678;
console.log('user route. Test server on port: ', port);
const server = require(__dirname + '/../_server');
const User = require(__dirname + '/../models/user');

describe('Database can add/view/remove users', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/lfgData_test', done);
    console.log('user server on port: ', port);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        console.log('user server closing');
        server.close(done);
      });
    });
  });

  it('should be able to POST users', (done) => {
    request('localhost:' + port)
    .post('/auth/signup')
    .send({
      username: 'USERNAME',
      password: 'PA55WORD',
      email: 'dude@dude.com',
      firstName: 'Dude',
      lastName: 'Duderson',
      city: 'Dudeville',
      hosting: false
    })
    .end((err, res) => {
      console.log(res.body);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('Signup complete!');
      expect(res.body.token).to.be.a('string');
      done();
    })
  })

  it('should be able to GET user info', (done) => {
    request('localhost:' + port)
    .get('/api/signin')
    .end((err, res) => {
      console.log(res);
      done();
    })
  })
})
