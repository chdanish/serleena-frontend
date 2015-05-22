/**
   * Name: TelemetryService
   * Package: Telemetry
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa service secondo DP
   *
   */

angular.module('telemetry').service('TelemetryService', TelemetryService);

/**
  * Classe singleton che gestisce le chiamate al backend per ottenere i
  * tracciamenti relativi a una particolare esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @memberOf Telemetry
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {Service} AuthService - Servizio di gestione dell'autenticazione
  * utente, necessario per l'uso del token con cui firmare le richieste.
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function TelemetryService($http, AuthService, BACKEND_URL) {
  /**
   * Implementa la comunicazione con il server per ottenere la lista dei
   * tracciamenti di un'esperienza.
   * @function getTelemetryList
   * @memberOf Telemetry.TelemetryService
   * @instance
   * @param {Number} experienceId - Codice identificativo dell'esperienza.
   * @param {Number} trackId - Codice identificativo del percorso.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var getTelemetryList = function(experienceId, trackId, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'GET',
        url: BACKEND_URL + "/experiences/" + experienceId + "/tracks/" +
              trackId + "/telemetries",
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
   * Implementa la comunicazione con il server per ottenere tutte le
   * informazioni relative a un particolare tracciamento di un'esperienza.
   * @function getTelemetryDetails
   * @memberOf Telemetry.TelemetryService
   * @instance
   * @param {Number} experienceId - Codice identificativo dell'esperienza.
   * @param {Number} trackId - Codice identificativo del percorso.
   * @param {Numer} telemetryId - Codice identificativo del tracciamento.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var getTelemetryDetails = function(experienceId, trackId, telemetryId,
    callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'GET',
        url: BACKEND_URL + "/experiences/" + experienceId + "/tracks/" +
              trackId + "/telemetries/" + telemetryId,
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

  return {
    getTelemetryList: getTelemetryList,
    getTelemetryDetails: getTelemetryDetails
  };
}
