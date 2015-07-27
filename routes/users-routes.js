var usersController = require('./controllers/users-controller');
var usersUserController = require('./controllers/users-user-controller');
var bodyParser = require('body-parser');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.route('/users')
    .get(usersController.get)
    .post(usersController.post)

  router.route('/users/:user')
    .get(usersUserController.get)
    .delete(usersUserController.delete)

}
