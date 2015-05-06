angular
	.module('testModule', []);

angular
	.module('serleenaFrontend', [
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