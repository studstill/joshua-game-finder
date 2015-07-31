'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    if (auth.isSignedIn()) $location.path('/');
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      if (user.email) { //was user.password_confirmation
        auth.create(user, function(err) {
          if (err) {
            return $scope.errors.push({
              msg: 'could not sign in'
            });
          }

          $location.path('/');
        })
      } else {
        auth.signIn(user, function(err) {
          if (err) {
            return $scope.errors.push({
              msg: 'could not create user'
            });
          }

          $location.path('/');
        });
      }
    };
    $scope.logout = auth.logout;

  }]);
};
