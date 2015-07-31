module.exports = function(app) {
  var handleError = function(callback) {
    return function(data) {
      callback(data);
    };
  };

  var handleSuccess = function(callback) {
    return function(data) {
      callback(null, data);
    };
  };

  app.factory('RESTResource', ['$http', '$cookies', function($http, $cookies) {
    return function(resourceName) {
      var jwt = $cookies.get('jwt');
      $http.defaults.headers.common['x-access-token'] = jwt;
      return {
        getAll: function(callback) {
          $http.get('/api/' + resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(resourceData, callback) {
          $http.put('/api/' + resourceName + '/' + resourceData._id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        remove: function(resourceData, callback) {
          $http.delete('/api/' + resourceName + '/' + resourceData._id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
