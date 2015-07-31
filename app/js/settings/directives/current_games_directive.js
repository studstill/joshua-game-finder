'use strict';

module.exports = function(app) {
  app.directive('currentGames', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/current_games.html'
    }
  });
};
