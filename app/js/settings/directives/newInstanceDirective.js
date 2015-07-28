'use strict';

module.exports = function(app){
	app.directive('newInstanceDirective', function(){
		return {
			restrict: 'AC',
			templateUrl: 'app/templates/settings/directives/new_instance_template.html',
			replace: true
		}
	});
};
