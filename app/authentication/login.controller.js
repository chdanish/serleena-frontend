/**
 * Name: login.controller.js
 * Package: Authentication
 * Author: Antonio Cavestro
 *
 * History:
 * Version    Programmer  	        Changes
 * 0.0.1      Antonio Cavestro 		Crea file
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
