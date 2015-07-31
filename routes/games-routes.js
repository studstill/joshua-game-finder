var gamesController = require('./controllers/games-controller');
var gamesGameController = require('./controllers/games-game-controller');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var verify = require('./middleware/verify');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/games', gamesController.get);
  router.post('/games', gamesController.post);

  router.get('/games/:game', gamesGameController.get);
  router.put('/games/:game', gamesGameController.put);

  router.delete('/games/:game', gamesGameController.delete);

}
