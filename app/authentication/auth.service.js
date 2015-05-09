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

  return {
    loginUser: loginUser,
    registerUser: registerUser,
  };
}
