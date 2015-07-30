'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope','$location', 'auth', function($scope, $location, auth) {

    if (auth.isSignedIn()) $location.path('/');
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      console.log("authController shows:");
      console.log(user);
      if (!user.password_confirmation) {
        auth.create(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }

          $location.path('/');
        })
      } else {
        auth.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create user'});
          }

          $location.path('/');
        });
      }
    };
  }]);
};
