/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


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
