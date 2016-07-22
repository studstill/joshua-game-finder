var usersController = require('./controllers/users-controller');
var usersUserController = require('./controllers/users-user-controller');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var verify = require('./middleware/verify');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/users', verify, usersController.get);
  // "Sign-up" route:
  router.post('/users', usersController.post);


  router.get('/users/:user', verify, usersUserController.get);
  // TODO - verify that user is themselves
  router.put('/users/:user', verify, usersUserController.put);

  router.delete('/users/:user', verify, usersUserController.delete);

}
