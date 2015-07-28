var instancesController = require('./controllers/instances-controller');
var instancesInstanceController = require('./controllers/instances-instance-controller');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/instances', instancesController.get)
  router.post('/instances', instancesController.post)

  router.get('/instances/:instance', instancesInstanceController.get)
  router.delete('/instances/:instance', instancesInstanceController.delete)

}
