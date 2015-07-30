'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$cookies', function($http, $cookies) {
    return {
      signIn: function(user, callback) {
        $http.post('/auth/login', user)
          .success(function(data) {
            $cookies.put('jwt', data.token);
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      create: function(user, callback) {
        console.log("auth.js shows:");
        console.log(user);
        $http.post('/api/users', user)
          .success(function(data) {
            console.log(data);
            $cookies.put('jwt', data.token)
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      logout: function() {
        $cookies.put('jwt', '');
      },

      isSignedIn: function() {
        return !!($cookies.get('jwt') && $cookies.get('jwt').length);
      }
    };
  }]);
};
