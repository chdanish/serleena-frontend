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
   * Name: SyncExperiencesService
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 1.0.0        Antonio Cavestro     Implementa service
   *
   */
angular.module('synchronization').service('SyncExperiencesService',
  SyncExperiencesService);

/**
  * Classe singleton che gestisce le chiamate al backend relative alla gestione
  * della lista delle esperienze da sincronizzare.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @memberOf Synchronization
  * @example Quando l’utente accede alle impostazioni di sincronizzazione,
  * SyncExperiencesController interroga questo componente per ottenere la lista
  * corrente. Una volta inviate le modifiche, il controller citato in precedenza
  * richiama SyncExperiencesService per l’aggiornamento della lista remota.
  *
  * @constructor
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {Service} AuthService - Servizio di gestione dell'autenticazione
  * utente, necessario per l'uso del token con cui firmare le richieste.
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function SyncExperiencesService($http, AuthService, BACKEND_URL) {
  /**
   * Implementa la comunicazione con il server per ottenere la lista delle
   * esperienze da sincronizzare.
   * @function getSyncList
   * @memberOf Synchronization.SyncExperiencesService
   * @instance
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var getSyncList = function(callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'GET',
        url: BACKEND_URL + "/data/sync",
        headers: {
          'X-AuthToken': token
        }
      }).success(function(data){
        callback(true, data);
      }).error(function(data){
        callback(false, data);
      });
    });
  };
  /**
   * Implementa la comunicazione con il server per salvare la lista di
   * sincronizzazione aggiornata.
   * @function setSyncList
   * @memberOf Synchronization.SyncExperiencesService
   * @instance
   * @param {Array} newList - Lista di sincronizzazione aggiornata.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var setSyncList = function(newList, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'PUT',
        url: BACKEND_URL + "/data/sync",
        headers: {
          'X-AuthToken': token
        },
        data: {
          exp_list: newList
        }
      }).success(function(data){
        callback(true, data);
      }).error(function(data){
        callback(false, data);
      });
    });
  };

  return {
    getSyncList: getSyncList,
    setSyncList: setSyncList
  };
}
