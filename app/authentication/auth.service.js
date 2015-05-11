/**
   * Name: AuthService
   * Package: Authentication
   * Author: Antonio Cavestro
   * Date: 2015-05-08
   *
   * History:
   * Version      Programmer       Date          Changes
   * 0.0.1        Matteo Lisotto   2015-05-08    Crea file
   * 0.0.2        Antonio Cavestro 2015-05-09    Prima implementazione metodi
   *
   */

/**
 * @namespace Authentication
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
  * @param {Provider} $cookies - Facade di AngularJS per la gestione dei
  * cookie
  * @param {Scope} $rootScope - ViewModel globale per salvare se l'utente è
  * autenticato o meno.
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function AuthService($http, $cookies, $rootScope, BACKEND_URL) {
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
      $cookies.serleena_user = email;
      $cookies.serleena_token = data;
      $rootScope.userLogged = true;
      callback(true, null);
    }).error(function(data, status, headers, config){
      callback(false, data);
    });
  };
  /**
   * Effettua il logout dell'utente.
   * @function logoutUser
   * @memberOf AuthService
   * @instance
   * @param {function} callback - Funzione da invocare dopo aver effettuato il
   * logout
   */
  var logoutUser = function(callback){

    delete $cookies.serleena_user;
    delete $cookies.serleena_token;
    $rootScope.userLogged = false;
    callback();
  };
  /**
   * Verifica se l'utente è autenticato.
   * @function isLogged
   * @memberOf AuthService
   * @instance
   * @returns {Boolean}
   */
  var isLogged = function(){
    if (typeof $cookies.serleena_user == "undefined"){
      return false;
    }
    return true;
  };
  /**
   * Passa alla funzione callback il valore del token di autenticazione
   * dell'utente, permettendo a chi la invoca di effettuare richieste
   * autenticate al backend.
   * @function authRequest
   * @memberOf AuthService
   * @instance
   * @param {function} callback - Funzione da invocare e a cui passare il valore
   * del token di autenticazione.
   */
  var authRequest = function(callback){
    callback($cookies.get("serleena_token"));
  };

  return {
    loginUser: loginUser,
    logoutUser: logoutUser,
    isLogged: isLogged,
    authRequest: authRequest
  };
}
