var instancesController = require('./controllers/instances-controller');
var instancesInstanceController = require('./controllers/instances-instance-controller');
var bodyParser = require('body-parser');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.route('/instances')
    .get(instancesController.get)
    .post(instancesController.post)

  router.route('/instances/:instance')
    .get(instancesInstanceController.get)
    .delete(instancesInstanceController.delete)

}
