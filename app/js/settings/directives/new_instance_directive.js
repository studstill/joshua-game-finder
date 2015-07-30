'use strict';

module.exports = function(app){
	app.directive('newInstance', function(){
		return {
			restrict: 'AC',
			templateUrl: '../../../templates/settings/directives/new_instance_template.html',
			replace: true
		}
	});
};
