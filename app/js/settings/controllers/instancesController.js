'use strict';

module.exports = function(app) {
  app.controller('instancesController', ['$scope', '$http', function($scope, $http) {

    var getAll = function(){
      $http.get('/api/instances').success(function(response){
        console.log(response);
        $scope.instances = response;
      });
    };

    getAll();

    $scope.submitForm = function(instance) {
      console.log(instance);
      $http.post('/api/instances:instanceID', instance).success(function(response) {
        getAll();
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
      $http.put('/api/instances/' + instance._id, instance)
        .error(function (error) {
          console.log(error);
          $scope.errors.push({msg: 'could not update instance'});
        });
      instance.editing = false;
      getAll();
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
