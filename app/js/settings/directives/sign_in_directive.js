'use strict';

module.exports = function(app) {
  app.directive('signIn', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/sign_in.html'
    };
  });
};
