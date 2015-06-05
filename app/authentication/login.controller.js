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
 * Name: login.controller.js
 * Package: Authentication
 * Author: Antonio Cavestro
 *
 * History:
 * Version    Programmer  	        Changes
 * 1.0.0      Antonio Cavestro 		Crea file
 *
 */

angular.module('authentication').controller('LoginController', LoginController);

/**
 * Classe che gestisce il login al portale
 *
 * @example L’applicativo è configurato tramite App.AppConfiguration per
 * invocare questo controller quando il browser richiede la pagina di login.
 * Effettua la richiesta al backend tramite AuthService. Da LoginView riceve
 * l’indirizzo email e la password. Se la richiesta ha esito positivo, chiede al
 * service di generare un cookie con il token ricevuto dal backend e rimanda
 * l’utente alla pagina principale. Altrimenti, spedisce alla vista il messaggio
 * di errore.
 * @constructor
 * @memberOf Authentication
 * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
 * controller (il model) ed in cui vengono valutate le espressioni utilizzate
 * nella view.
 * @param {Service} $location - Facade di AngularJS con il quale interagire
 * per gestire la history del browser e gli indirizzi.
 * @param {Service} AuthService - Servizio che gestisce autenticazione utente.
 *
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 1.0
 */
function LoginController ($scope, $location, AuthService){

	/**
	 * Email utente
	 *
	 * @name email
	 * @type String
	 * @memberOf Authentication.LoginController
	 * @instance
	 */
	$scope.email = "";
	/**
	 * Password utente
	 *
	 * @name password
	 * @type String
	 * @memberOf Authentication.LoginController
	 * @instance
	 */
	$scope.password = "";

	 /**
	 * Effettua il login utente.
	 * @function loginUser
	 * @memberOf Authentication.LoginController
	 * @instance
	 */
	$scope.loginUser = function(){
		AuthService.loginUser($scope.email, $scope.password, function(ok, data){
			if(ok){
				// il cookie lo gestisce AuthService, devo solo fare il redirect
				// alla dashboard
				$location.path("/dashboard");
			} else {
				$scope.showError = true;

				if (data.status == 401){
					$scope.errorMessage = "Credenziali non valide. Riprova.";
				} else {
					$scope.errorMessage = "Accesso fallito :(";
				}

			}
		});
	};

}
