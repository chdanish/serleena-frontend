/**
   * Name: SyncExperiencesService
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa service
   *
   */
angular.module('synchronization').service('SyncExperiencesService', SyncExperiencesService);

/**
  * Classe singleton che gestisce le chiamate al backend relative alla gestione
  * della lista delle esperienze da sincronizzare.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @memberOf Synchronization
  * @use Quando l’utente accede alle impostazioni di sincronizzazione,
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
        callback(true, data.experiences);
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
