/**
   * Name: PairingService
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 1.0.0        Antonio Cavestro     Implementa metodo pairDevice
   *
   */

angular.module('synchronization').service('PairingService', PairingService);

/**
  * Classe singleton che gestisce le chiamate al backend relative al pairing.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Espone metodi utilizzati da PairingController per effettuare il
  * pairing. Comunica con Authentication.AuthService per ottenere il token di
  * autenticazione da allegare alle richieste.
  *
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
