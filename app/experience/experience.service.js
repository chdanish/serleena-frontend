/**
   * Name: ExperienceService
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer       Changes
   * 0.0.1        Matteo Lisotto   Create file
   * 0.0.2        Antonio Cavestro Aggiunto metodo per ottenere la lista delle
   *                               esperienze
   * 0.0.3        Antonio Cavestro Aggiunto metodo per salvare un'esperienza.
   * 0.0.4        Antonio Cavestro Aggiunto metodo per cancellare un'esperienza.
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
  /**
   * Implementa la comunicazione con il server per ottenere la lista delle
   * esperienze dell'utente.
   * @function getExperienceList
   * @memberOf ExperienceService
   * @instance
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var getExperienceList = function(callback){
    AuthService.authRequest(function(token) {
      $http({
        method: 'GET',
        url: BACKEND_URL + "/experiences",
        headers: {
          'X-AuthToken': token
        }
      }).success(function(data, status, headers, config){
        callback(true, data.experiences);
      }).error(function(data){
        callback(false, data);
      });
    });
  };
  /**
   * Implementa la comunicazione con il server per il salvataggio di una nuova
   * esperienza
   * @function saveExperience
   * @memberOf ExperienceService
   * @instance
   * @param {String} name - Nome dell'esperienza
   * @param {Array} tracks - Array di percorsi
   * @param {String} from - Coordinata del punto a nord-est del perimetro
   * dell'esperienza, espressa nella forma "latitudine;longitudine".
   * @param {String} to - Coordinata del punto a sud-ovest del perimetro
   * dell'esperienza, espressa nella forma "latitudine;longitudine".
   * @param {Array} POI - Array dei punti d'interesse selezionati per
   * l'esperienza.
   * @param {Array} customPoints - Array dei punti utente creati per
   * l'esperienza.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var saveExperience = function(name, tracks, from, to, POI, customPoints, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'POST',
        url: BACKEND_URL + "/experiences",
        headers: {
          'X-AuthToken': token
        },
        data: {
          name: name,
          tracks: tracks,
          from: from,
          to: to,
          points_of_interest: POI,
          user_points: customPoints
        }
      }).success(function(data){
        callback(true, data);
      }).error(function(data){
        callback(false, data);
      });
    });
  };
  /**
   * Implementa la comunicazione con il server per cancellare un'esperienza.
   * @function deleteExperience
   * @memberOf ExperienceService
   * @instance
   * @param {Number} experienceId - Id dell'esperienza da cancellare.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var deleteExperience = function(experienceId, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'DELETE',
        url: BACKEND_URL + "/experiences/" + experienceId,
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
    getExperienceList: getExperienceList,
    saveExperience: saveExperience,
    deleteExperience: deleteExperience
  };
}
