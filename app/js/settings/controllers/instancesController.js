'use strict';

module.exports = function(app) {
  app.controller('instancesController', ['$scope', '$http', '$cookies', '$route', '$window', function($scope, $http, $cookies, $route, $window) {
    var jwt = $cookies.get('jwt');
    $http.defaults.headers.common['x-access-token'] = jwt;
    var getAll = function() {
      $http.get('/api/instances').success(function(response) {
        console.log(response);
        $scope.instances = response.data;
        console.log("does this get response.userId? ");
        console.log(response.userId);
        $scope.userId = response.userId;
      });
    };

    getAll();

    $scope.submitForm = function(instance) {
      console.log(instance);
      $http.post('/api/instances/', instance).success(function(response) {
        console.log("post successful");
        $http.get('/api/instances').success(function(response) {
          $scope.instances = response.data;
        });
      });
    };

    $scope.destroy = function(id) {
      console.log(id);
      $http.delete('/api/instances/' + id).success(function(response) {
        getAll();
      });
    }

    $scope.edit = function(instance) {
      instance.editing = true;
      console.log(instance);
    };

    $scope.cancel = function(instance) {
      getAll();
    };

    $scope.update = function(instance) {
      console.log(instance);
      $http.put('/api/instances/' + id, instance)
        .error(function(error) {
          console.log(error);
          $scope.errors.push({
            msg: 'could not update instance'
          });
        });
      instance.editing = false;
      getAll();
    };
    $scope.reloadPage = function() {
      $window.location.reload();
    };
    $scope.join = function(id){
      $http.put('/api/instances/' + id + "/join");
    };
    $scope.quit = function(id){
      $http.put('/api/instances/' + id + "/quit");
    };
    $scope.gameOver = function(id){
      $http.put('/api/instances/' + id, {
        gameOver: true
      });
    };
  }]);
};



// 'use strict';
//
// module.exports = function(app) {
// 	app.controller('instancesController', ['$scope', 'resource', function($scope, resource) {
//
// 		var Instance = resource('instances');
//
// 		$scope.getInstances = function(){
// 			Instance.getAll(function(response){
// 				console.log(response);
// 				$scope.instances = response;
// 			});
// 		};
//
// 		$scope.submitForm = function(instance) {
// 			console.log('submitted');
// 			Instance.submitForm(instance, function(response) {
// 				$scope.getInstances();
// 			});
// 		};
//
// 		$scope.destroy = function(id) {
// 			console.log(id);
// 			Instance.destroy(id, function(response) {
// 				$scope.getInstances();
// 			});
// 		}
//
// 		$scope.edit = function(instance) {
// 			Instance.editing = true;
// 			console.log(instance);
// 		};
// 	}]);
// };
