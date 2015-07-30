var gamesController = require('./controllers/games-controller');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var verify = require('./middleware/verify');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/games', gamesController.get);
  router.post('/games', gamesController.post);

  router.get('/games/:user', gamesGameController.get);
  router.put('/games/:user', gamesGameController.put);

  router.delete('/games/:user', gamesGameController.delete);

}
