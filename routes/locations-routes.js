var locationsController = require('./controllers/locations-controller');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var verify = require('./middleware/verify');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/locations', locationsController.get);
  router.post('/locations', locationsController.post);

  router.get('/locations/:user', locationsLocationController.get);
  router.put('/locations/:user', locationsLocationController.put);

  router.delete('/locations/:user', locationsLocationController.delete);

}
