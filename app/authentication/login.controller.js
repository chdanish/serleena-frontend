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

	$scope.email = "";
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
