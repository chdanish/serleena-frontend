angular
	.module('testModule', []);

angular
	.module('testAngular', [
		'ngRoute',
		'testModule'
	]).config(configApp);

function configApp($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: 'app/test/test.html',
			controller: 'TestController'
		});
}