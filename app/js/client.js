'use strict';

require('angular/angular');
require('angular-route');

var gameApp = angular.module('gameApp', ['ngRoute']);

//services
require('./services/resourceServices.js')(gameApp);

//controllers
require('./settings/controllers/instancesController.js')(gameApp);

//directives
//require('./settings/directives/newSettingDirective.js')(settingsApp);

//routeProvider
//require(....)(app);


//New file
// module.exports = function(app) {
// 	app.config(['$routeProvider', function($routeProvider) {
// 		$routeProvider
// 		.when('/shit', {
// 			templateUrl: '/templates/settings/directives/new_settings_template.html',
// 			controller: 'settingsController'
// 		})
// 		.otherwise({
// 			redirectTo: '/'
// 		});
// 	}]);
// }
