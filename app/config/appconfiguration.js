/**
 * Name: appconfiguration.js
 * Package: App
 * Author: Antonio Cavestro
 * Date: 2015-05-06
 *
 * History:
 * Version    Programmer  		Date        Changes
 * 0.0.1      Antonio Cavestro 	2015-05-06  Crea file
 * 0.0.2      Matteo Lisotto	2015-05-08  Aggiungi moduli e aggiorna
 *                                          dipendenze di serleenaFrontend
 *
 */

/**
 * @namespace Configuration
 */

angular
        .module('authentication', ['ngCookies']);
angular
        .module('experience', []);
angular
        .module('map', []);
angular
        .module('synchronization', []);
angular
        .module('telemetry', []);
angular
        .module('wizard', []);

angular
	.module('serleenaFrontend', [
		'ngRoute',
	        'authentication',
	        'experience',
	        'map',
	        'synchronization',
	        'telemetry',
	        'wizard'
	]).config(AppConfiguration)
	.run(AppInit);

angular.module('serleenaFrontend')
	.value('BACKEND_URL', 'http://api.hitchhikers.info');

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
				templateUrl: 'app/authentication/login.view.html',
				controller: 'LoginController'
			})
			.when("/logout", {
				templateUrl: 'app/authentication/logout.view.html',
				controller: 'LogoutController'
			})
			.when("/recoverpassword", {
				templateUrl: 'app/authentication/passwordrecovery.view.html',
				controller: 'PasswordRecoveryController'
			});
	}();
}

function AppInit($rootScope, AuthService){
	$rootScope.userLogged = AuthService.isLogged();
}
