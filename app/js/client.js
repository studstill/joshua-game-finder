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
require('./settings/directives/new_instance_directive.js')(gameApp);
require('./settings/directives/create_user_directive.js')(gameApp);
require('./settings/directives/sign_in_directive.js')(gameApp);
require('./settings/directives/logout_directive.js')(gameApp);
require('./settings/directives/current_games_directive.js')(gameApp);

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
