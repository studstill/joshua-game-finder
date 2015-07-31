'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', '$window', '$timeout', 'auth', function($scope, $location, $window, $timeout, auth) {

    if (auth.isSignedIn()) $location.path('/');
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      console.log("authController shows:");
      console.log(user);
      if (user.email) { //was user.password_confirmation
        auth.create(user, function(err) {
          if (err) {
            console.log(err);
            return $scope.errors.push({
              msg: 'could not sign in'
            });
          }

          $location.path('/');
        })
      } else {
        auth.signIn(user, function(err) {
          if (err) {
            console.log(err);
            return $scope.errors.push({
              msg: 'could not create user'
            });
          }

          $location.path('/');
        });
      }
    };
    $scope.logout = auth.logout;

    $scope.reloadPage = function() {
      console.log("called authController reloadPage");
      $timeout(function() {
        $window.location.reload();
      }, 200);
    };
  }]);
};
