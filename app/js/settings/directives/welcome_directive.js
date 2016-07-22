'use strict';

module.exports = function(app) {
  app.directive('welcome', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/welcome.html'
    };
  });
};
