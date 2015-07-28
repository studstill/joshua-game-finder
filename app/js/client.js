'use strict';

require('angular/angular');
require('angular-route');

var gameApp = angular.module('gameApp', ['ngRoute']);

//services
require('./services/resourceServices.js')(gameApp);

//controllers
require('./settings/controllers/instancesController.js')(gameApp);

//directives
require('./settings/directives/newInstanceDirective.js')(gameApp);

//routeProvider
//require(....)(app);


//New file

	gameApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/addInstance', {
			templateUrl: './templates/settings/directives/new_instance_template.html',
			controller: 'instancesController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);
