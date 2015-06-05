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
 * Version    Programmer  		Changes
 * 0.0.1      Antonio Cavestro 	Crea file
 * 0.0.2      Matteo Lisotto	Aggiungi moduli e aggiorna dipendenze di
 *								serleenaFrontend
 * 0.0.3	  Antonio Cavestro 	Aggiungi configurazione mappe
 * 1.0.0	  Antonio Cavestro  Migliora gestione url backend
 * 1.0.1	  Antonio Cavestro	Configura header per corretto utilizzo backend
 *
 */

/**
 * Classe che contiene la configurazione dell'applicazione.
 *
 * @example Si occupa di iniettare dipendenze e configurazioni all’interno dei
 * componenti, ad esempio il servizio mappe da caricare e le sue impostazioni.
 * Inoltre, attraverso l’oggetto $routeProvider di AngularJS5, specifica per
 * ogni indirizzo previsto quale controller bisogna invocare e la vista
 * associata.
 * @constructor
 * @param {Provider} $routeProvider - Il gestore delle route di AngularJS
 * @memberOf App
 *
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 1.0
 */
function AppConfiguration($routeProvider, MapProvider, DEBUG,
	PRODUCTION_BACKEND_URL, DEVELOP_BACKEND_URL, $httpProvider, $provide){
	/**
	 * Configura le route dell'applicazione.
	 * @private
	 * @function setRoutes
	 * @memberOf App.AppConfiguration
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
			})
			.when("/dashboard/experiences/:experienceId", {
				templateUrl: 'app/experience/experiencedetails.view.html',
				controller: 'ExperienceDetailsController'
			})
			.when("/dashboard/experiences/:experienceId/edit", {
				templateUrl: 'app/experience/experiencewizard.view.html',
				controller: 'ExperienceWizardController'
			})
			.when("/dashboard/experiences/:experienceId/delete", {
				templateUrl: 'app/experience/deleteexperience.view.html',
				controller: 'DeleteExperienceController'
			})
			.when("/dashboard/experiences/:experienceId/tracks/:trackId/telemetries", {
				templateUrl: 'app/telemetry/telemetry.view.html',
				controller: TelemetryController
			})
			.when("/dashboard/sync", {
				templateUrl: 'app/synchronization/syncexperiences.view.html',
				controller: 'SyncExperiencesController'
			})
			.when("/dashboard/pair", {
				templateUrl: 'app/synchronization/pairing.view.html',
				controller: 'PairingController'
			});
	}();
	/**
	 * Configura il gestore delle mappe.
	 * @private
	 * @function setMapType
	 * @memberOf App.AppConfiguration
	 * @instance
	 */
	var setMapType = function(){
		MapProvider.setMapType("GoogleMaps");
	}();

	/**
	 * Configura l'indirizzo del backend.
	 * @private
	 * @function setBackendURL
	 * @memberOf App.AppConfiguration
	 * @instance
	 */
	var setBackendURL = function(){
		if(DEBUG){
			$provide.value("BACKEND_URL", DEVELOP_BACKEND_URL);
		} else {
			$provide.value("BACKEND_URL", PRODUCTION_BACKEND_URL);
		}
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$httpProvider.defaults.headers.post['Content-Type'] =
			'application/x-www-form-urlencoded';
		$httpProvider.defaults.headers.put['Content-Type'] =
			'application/x-www-form-urlencoded';

		$httpProvider.defaults.transformRequest = function(data){
			if (data === undefined){
				return data;
			}

			var str = [];
			for(var p in data) {
				str.push(encodeURIComponent(p) + "=" +
					encodeURIComponent(data[p]));
			}

			return str.join("&");

		};
	}();

}
