'use strict';

module.exports = function(app){
	app.directive('newInstanceDirective', function(){
		return {
			restrict: 'AC',
			templateUrl: './app/templates/settings/directives/new_instance_template.html',
			replace: true
		}
	});
	// angular.module("orderByDate", [])
	// .controller("instancesController", ["$scope"], function(scope){
	// 	$scope.instances;
	// });
};
