var usersController = require('./controllers/users-controller');
var usersUserController = require('./controllers/users-user-controller');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/users', usersController.get);
  // "Sign-up" route:
  router.post('/users', usersController.post);

  router.get('/users/:user', usersUserController.get);
  router.delete('/users/:user', usersUserController.delete);

}
