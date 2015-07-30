'use strict';

module.exports = function(app) {
  app.directive('logout', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/logout.html'
    };
  });
};
