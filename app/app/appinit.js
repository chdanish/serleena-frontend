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
 * Name: appinit.js
 * Package: App
 * Author: Antonio Cavestro
 *
 * History:
 * Version    Programmer  		Changes
 * 1.0.0      Antonio Cavestro 	Crea file
 *
 */

/**
 * Classe che contiene l'inizializzazione dell'applicazione, in particolare lo
 * stato di autenticazione e il gestore degli accessi nelle varie aree.
 *
 * @example Si occupa di inizializzare l'applicazione, in particolar modo la
 * gestione degli accessi, che impedisce agli utenti non autenticati l'accesso
 * all'area riservata.
 * @constructor
 * @param {Provider} $rootScope - Contesto globale dell'applicazione, usato per
 * impostare globalmente se l'utente è autenticato o meno.
 * @param {Provider} $location - Facade di AngularJS con il quale interagire
 * per gestire la history del browser e gli indirizzi.
 * @param {Service} AuthService - Gestore dell'autenticazione.
 * @memberOf App
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 1.0
 */
function AppInit($rootScope, $location, AuthService){
	$rootScope.userLogged = AuthService.isLogged();
	/**
	 * Gestisce il controllo degli accessi nell'applicazione.
	 * @function accessManager
	 * @memberOf App.AppInit
	 * @instance
	 */
	var accessManager = function(){
		var userLoggedRedirectRoutes = {
			'/': '/dashboard'
		};
		var userForbiddenRoutes = {
			'/dashboard': '/'
		};
		var nextPath = $location.path();
		var redirect;

		if ($rootScope.userLogged){
			redirect = userLoggedRedirectRoutes[nextPath];
		} else {
			for(var before in userForbiddenRoutes){
				if(nextPath.indexOf(before) != -1){
					redirect = userForbiddenRoutes[before];
				}
			}
		}

		if (typeof redirect != 'undefined'){
			$location.path(redirect);
		}
	};

	$rootScope.$on('$routeChangeStart', accessManager);
}
