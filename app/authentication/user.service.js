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
  /**
   * Implementa la comunicazione con il server per effetturare la registrazione
   * utente.
   * @function registerUser
   * @memberOf UserService
   * @instance
   * @param {String} email
   * @param {String} password
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var registerUser = function(email, password, callback){
    $http({
      url: BACKEND_URL + "/user",
      method: 'POST',
      data: {
        email: email,
        password: password
      }
    }).success(function(data, status, headers, config){
      callback(true, data);
    }).error(function(data, status, headers, config){
      callback(false, data);
    });
  };
  /**
   * Implementa la comunicazione con il server per effetturare il recupero della
   * password utente.
   * @function recoverUser
   * @memberOf UserService
   * @instance
   * @param {String} email
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var recoverUser = function(email, callback){
    $http({
      url: BACKEND_URL + "/user/recovery",
      method: 'PUT',
      data: {
        email: email
      },
    }).success(function(data, status, headers, config){
      callback(true, data);
    }).error(function(data, status, headers, config){
      callback(false, data);
    });
  };

  return {
    registerUser: registerUser,
    recoverUser: recoverUser
  };
}
