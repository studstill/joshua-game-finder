'use strict';

module.exports = function(app){
	app.directive('createUser', function(){
		return {
			restrict: 'AC',
			templateUrl: './templates/views/create_user.html'
		}
	});
};
