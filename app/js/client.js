'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
var gameApp = angular.module('gameApp', ['ngRoute', 'ngCookies']);

//services
require('./services/resourceServices.js')(gameApp);
require('./services/copy')(gameApp);
require('./services/auth')(gameApp);

//controllers
require('./settings/controllers/instancesController.js')(gameApp);
require('./settings/controllers/authController.js')(gameApp);

//directives
require('./settings/directives/newInstanceDirective.js')(gameApp);
require('./settings/directives/create_user.js')(gameApp);

//routeProvider
//require(....)(app);


//New file

gameApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/addInstance', {
      templateUrl: './templates/settings/directives/new_instance_template.html',
      controller: 'instancesController'
    })
    .when('/searchForm', {
      templateUrl: './templates/settings/directives/search_form.html',
      controller: 'instancesController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
