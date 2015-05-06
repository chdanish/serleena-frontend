/**
 * Name: appconfiguration.js
 * Package: App
 * Author: Antonio Cavestro
 * Date: 2015-05-06
 *
 * History:
 * Version    Programmer  		Date        Changes
 * 0.0.1  	Antonio Cavestro  	2015-05-06	Create file
 *
 */

/**
 * @namespace Configuration
 */

angular
	.module('serleenaFrontend', [
		'ngRoute',
		'testModule'
	]).config(AppConfiguration);

/**
 * Classe che contiene la configurazione dell'applicazione.
 *
 * @constructor
 * @param {Provider} $routeProvider - Il gestore delle route di AngularJS
 *
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 0.1
 */
function AppConfiguration($routeProvider){
	/**
	 * Configura le route dell'applicazione.
	 * @private
	 * @function setRoutes
	 * @memberOf AppConfiguration
	 */
	var setRoutes = function(){
		$routeProvider
			.when("/", {
				templateUrl: 'app/test/test.html',
				controller: 'TestController'
			});
	}();
}
