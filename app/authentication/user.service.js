/**
   * Name: LogoutController
   * Package: Authentication
   * Author: Antonio Cavestro
   * Date: 2015-05-08
   *
   * History:
   * Version      Programmer       Date          Changes
   * 0.0.1        Matteo Lisotto   2015-05-08    Crea file
   *
   */

angular.module('authentication').service('UserService', UserService);

/**
  * Classe singleton che implementa la comunicazione con il backend per le
  * richieste relative alla gestione utente.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function UserService($http, BACKEND_URL) {
}
