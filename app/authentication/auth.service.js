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
   * Name: AuthService
   * Package: Authentication
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Crea file
   * 1.0.0        Antonio Cavestro     Prima implementazione metodi
   *
   */

angular.module('authentication').service('AuthService', AuthService);

/**
  * Classe singleton che implementa la comunicazione con il backend per le
  * richieste relative all’autenticazione.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Espone dei metodi tramite i quali LoginController e
  * LogoutController possono interagire con il backend per la gestione
  * dell’autenticazione.
  * @memberOf Authentication
  * @constructor
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {Service} $cookies - Facade di AngularJS per la gestione dei
  * cookie
  * @param {Scope} $rootScope - Contesto globale dell'applicazione, usato per
  * salvare se l'utente è autenticato o meno.
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function AuthService($http, $cookies, $rootScope, BACKEND_URL) {
  /**
   * Implementa la comunicazione con il server per effetturare il login utente.
   * @function loginUser
   * @memberOf Authentication.AuthService
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
        'X-AuthData': email + "+" + password
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
   * @memberOf Authentication.AuthService
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
   * @memberOf Authentication.AuthService
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
   * @memberOf Authentication.AuthService
   * @instance
   * @param {function} callback - Funzione da invocare e a cui passare il valore
   * del token di autenticazione.
   */
  var authRequest = function(callback){
    callback($cookies.serleena_token);
  };

  return {
    loginUser: loginUser,
    logoutUser: logoutUser,
    isLogged: isLogged,
    authRequest: authRequest
  };
}
