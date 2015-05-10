/**
   * Name: LogoutController
   * Package: Authentication
   * Author: Matteo Lisotto
   * Date: 2015-05-08
   *
   * History:
   * Version      Programmer       Date          Changes
   * 0.0.1        Matteo Lisotto   2015-05-08    Crea file
   * 0.0.2        Antonio Cavestro 2015-05-10    Aggiungi funzione di logout
   *
   */

/**
 * @namespace Authentication
 */

angular.module('authentication').controller('LogoutController', LogoutController);

/**
  * Classe per la gestione della disconnessione di un utente.
  *
  * @author Antonio Cavestro <antonio.cavestro@gmail.com>
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Provider} $location - Oggetto che si occupa di gestire l'indirizzo
  * corrente dell'applicazione.
  * @param {Service} AuthService - Servizio che gestisce autenticazione utente.
  */
function LogoutController($scope, $location, AuthService) {

  $scope.logoutUser = function(){
    AuthService.logoutUser(function(){
      $location.path("#/");
    });
  };
}
