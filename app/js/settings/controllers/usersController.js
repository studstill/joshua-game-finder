'use strict';

module.exports = function(app) {
	app.controller('usersController', ['$scope', 'resource', function($scope, resource) {

		var User = resource('users');

		$scope.getUsers = function(){
			User.getAll(function(response){
				console.log(response);
				$scope.users = response;
			});
		};

		$scope.submitForm = function(user) {
			console.log('submitted');
			user.submitForm(user, function(response) {
				$scope.getUsers();
			});
		};

		$scope.destroy = function(id) {
			console.log(id);
			User.destroy(id, function(response) {
				$scope.getUsers();
			});
		}

		$scope.edit = function(user) {
			user.editing = true;
			console.log(user);
		};
	}]);
};
