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
   * Name: PairingService
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa metodo pairDevice
   *
   */

angular.module('synchronization').service('PairingService', PairingService);

/**
  * Classe singleton che gestisce le chiamate al backend relative al pairing.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @memberOf Synchronization
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  * @param {Service} AuthService - Service che gestisce la comunicazione con il
  * backend relativa all'autenticazione utente.
  */

function PairingService($http, BACKEND_URL, AuthService) {
  /**
   * Implementa la chiamata al backend per il pair del dispositivo.
   * @function pairDevice
   * @memberOf Synchronization.PairingService
   * @instance
   * @param {String} tempToken - Token temporaneo proveniente dall'applicazione
   * serleena.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var pairDevice = function(tempToken, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'PUT',
        url: BACKEND_URL + "/users/pair",
        headers: {
          'X-AuthToken': token
        },
        data: {
          temp_token: tempToken
        }
      }).success(function(data){
        callback(true, data);
      }).error(function(data){
        callback(false, data);
      });
    });
  };

  return {
    pairDevice: pairDevice
  };
}
