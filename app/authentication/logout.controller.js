/**
   * Name: LogoutController
   * Package: Authentication
   * Author: Matteo Lisotto
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Crea file
   * 0.0.2        Antonio Cavestro     Aggiungi funzione di logout
   *
   */

angular.module('authentication').controller('LogoutController', LogoutController);

/**
  * Classe per la gestione della disconnessione di un utente.
  *
  * @author Antonio Cavestro <antonio.cavestro@gmail.com>
  * @version 0.1
  * @constructor
  * @memberOf Authentication
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Provider} $location - Facade di AngularJS con il quale interagire
  * per gestire la history del browser e gli indirizzi.
  * @param {Service} AuthService - Servizio che gestisce autenticazione utente.
  */
function LogoutController($scope, $location, AuthService) {
  /**
   * Effettua logout utente.
   * @function logoutUser
   * @memberOf Authentication.LogoutController
   * @instance
   */
  $scope.logoutUser = function(){
    AuthService.logoutUser(function(){
      $location.path("/");
    });
  };
}
