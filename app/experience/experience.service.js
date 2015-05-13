/**
   * Name: ExperienceService
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer       Changes
   * 0.0.1        Matteo Lisotto   Create file
   *
   */

angular.module('experience').service('ExperienceService', ExperienceService);

/**
  * Classe singleton che implementa la comunicazione con il backend per le
  * richieste relative alle esperienze.
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

function ExperienceService($http, AuthService, BACKEND_URL) {
}
