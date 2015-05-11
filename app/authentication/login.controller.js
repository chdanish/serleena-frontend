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
 * Date: 2015-05-09
 *
 * History:
 * Version    Programmer  		Date        Changes
 * 0.0.1  	Antonio Cavestro  	2015-05-09	Crea file
 *
 */

/**
 * @namespace Authentication
 */

angular.module('authentication').controller('LoginController', LoginController);

/**
 * Classe che gestisce il login al portale
 *
 * @constructor
 * @param {Scope} $scope - L'oggetto ViewModel del controller.
 *
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 0.1
 */
function LoginController ($scope, $location, AuthService){

	/**
	 * Email utente
	 *
	 * @name email
	 * @type String
	 * @memberOf LoginController
	 * @instance
	 */
	$scope.email = "";
	/**
	 * Password utente
	 *
	 * @name password
	 * @type String
	 * @memberOf LoginController
	 * @instance
	 */
	$scope.password = "";

	 /**
	 * Effettua il login utente.
	 * @function loginUser
	 * @memberOf LoginController
	 * @instance
	 */
	$scope.loginUser = function(){
		AuthService.loginUser($scope.email, $scope.password, function(ok, data){
			if(ok){
				// il cookie lo gestisce AuthService, devo solo fare il redirect
				// alla dashboard
				$location.path("/dashboard");
			} else {
				$scope.errorMessage = "Accesso fallito :(";
				$scope.showError = true;
			}
		});
	};

}
