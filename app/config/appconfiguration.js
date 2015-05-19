/**
 * Name: appconfiguration.js
 * Package: App
 * Author: Antonio Cavestro
 *
 * History:
 * Version    Programmer  		Changes
 * 0.0.1      Antonio Cavestro 	Crea file
 * 0.0.2      Matteo Lisotto	Aggiungi moduli e aggiorna dipendenze di
 *								serleenaFrontend
 * 0.0.3	  Antonio Cavestro 	Aggiungi configurazione mappe
 *
 */

/**
 * @namespace Configuration
 */

/**
 * Classe che contiene la configurazione dell'applicazione.
 *
 * @constructor
 * @param {Provider} $routeProvider - Il gestore delle route di AngularJS
 *
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 0.2
 */
function AppConfiguration($routeProvider, MapProvider){
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
			})
			.when("/dashboard/experiences/new", {
				templateUrl: 'app/experience/experiencewizard.view.html',
				controller: 'ExperienceWizardController'
			}).
			when("/dashboard/experiences/:experienceId/delete", {
				templateUrl: 'app/experience/deleteexperience.view.html',
				controller: 'DeleteExperienceController'
			})
			.when("/dashboard/sync", {
				templateUrl: 'app/synchronization/syncexperiences.view.html',
				controller: 'SyncExperiencesController'
			});
	}();
	/**
	 * Configura il gestore delle mappe.
	 * @private
	 * @function setMapType
	 * @memberOf AppConfiguration
	 * @instance
	 */
	var setMapType = function(){
		MapProvider.setMapType("GoogleMaps");
	}();

}
