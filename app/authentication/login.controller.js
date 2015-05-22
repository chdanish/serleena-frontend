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

angular.module('authentication').controller('LoginController', LoginController);

/**
 * Classe che gestisce il login al portale
 *
 * @constructor
 * @memberOf Authentication
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
				$scope.errorMessage = "Accesso fallito :(";
				$scope.showError = true;
			}
		});
	};

}
