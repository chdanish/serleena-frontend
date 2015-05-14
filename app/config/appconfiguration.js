/**
 * Name: appconfiguration.js
 * Package: App
 * Author: Antonio Cavestro

 *
 * History:
 * Version    Programmer  	  Changes
 * 0.0.1      Antonio Cavestro 	  Crea file
 * 0.0.2      Matteo Lisotto	  Aggiungi moduli e aggiorna dipendenze 
 *                                di serleenaFrontend
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
	 * @instance
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
			})
			.when("/register", {
				templateUrl: 'app/authentication/register.view.html',
				controller: 'RegisterController'
			})
			.when("/dashboard", {
				templateUrl: 'app/experience/experiencelist.view.html',
				controller: 'ExperienceListController'
			});
	}();

}
