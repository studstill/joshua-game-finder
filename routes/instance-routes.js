var instancesController = require('./controllers/instances-controller');
var instancesInstanceController = require('./controllers/instances-instance-controller');
var verify = require('./middleware/verify');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/instances', verify, instancesController.get)
  router.post('/instances', verify, instancesController.post)

  router.get('/instances/:instance', instancesInstanceController.get)

  router.delete('/instances/:instance', verify, instancesInstanceController.delete)
  router.put('/instances/:instance', verify, instancesInstanceController.put)

  router.put('/instances/:instance/join', verify, instancesInstanceController.join)
  router.put('/instances/:instance/quit', verify, instancesInstanceController.quit)

}
