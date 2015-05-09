/**
   * Name: AuthService
   * Package: Authentication
   * Author: Antonio Cavestro
   * Date: 2015-05-08
   *
   * History:
   * Version      Programmer       Date          Changes
   * 0.0.1        Matteo Lisotto   2015-05-08    Create file
   *
   */

angular.module('authentication').service('AuthService', AuthService);

/**
  * Classe singleton che implementa la comunicazione con il backend per le
  * richieste relative all’autenticazione.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function AuthService($http, BACKEND_URL) {
  /**
   * Implementa la comunicazione con il server per effetturare il login utente.
   * @function loginUser
   * @memberOf AuthService
   * @instance
   * @param {String} email
   * @param {String} password
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var loginUser = function(email, password, callback){
    $http({
      url: BACKEND_URL + "/user/token",
      method: 'GET',
      headers: {
        'X-CustomToken': email + "+" + password
      },
    }).success(function(data, status, headers, config){
      callback(true, data);
    }).error(function(data, status, headers, config){
      callback(false, data);
    });
  };
  /**
   * Implementa la comunicazione con il server per effetturare la registrazione
   * utente.
   * @function registerUser
   * @memberOf AuthService
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
   * @memberOf AuthService
   * @instance
   * @param {String} email
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var recoverUser = function(email, callback){
    $http({
      url: BACKEND_URL + "/user/recover",
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
    loginUser: loginUser,
    registerUser: registerUser,
    recoverUser: recoverUser
  };
}
