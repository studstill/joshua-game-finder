var usersController = require('./controllers/users-controller');
var usersUserController = require('./controllers/users-user-controller');
var bodyParser = require('body-parser');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.route('/users')
    .get(usersController.get(req, res))
    .post(usersController.post(req, res))

  router.route('/users/:user')
    .get(usersUserController.get(req, res))
    .delete(usersUserController.delete(req, res))

}
