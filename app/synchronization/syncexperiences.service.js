/**
   * Name: SyncExperiencesService
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */
angular.module('synchronization').service('SyncExperiencesService', SyncExperiencesService);

/**
  * Classe singleton che gestisce le chiamate al backend relative alla gestione
  * della lista delle esperienze da sincronizzare.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {Service} AuthService - Servizio di gestione dell'autenticazione
  * utente, necessario per l'uso del token con cui firmare le richieste.
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function SyncExperiencesService($http, AuthService, BACKEND_URL) {
}
