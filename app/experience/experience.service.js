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
   * 1.0.0        Antonio Cavestro Aggiunto metodo per ottenere info esperienza
   *                               e info percorso.
   *
   */

angular.module('experience').service('ExperienceService', ExperienceService);

/**
  * Classe singleton che implementa la comunicazione con il backend per le
  * richieste relative alle esperienze.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @memberOf Experience
  * @example Espone dei metodi tramite i quali ExperienceListController e
  * ExperienceWizardController possono interagire con il backend per la gestione
  * delle esperienze. Comunica con Authentication.AuthService per ottenere il
  * token di autenticazione da allegare alle richieste.
  * @constructor
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
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
   * @memberOf Experience.ExperienceService
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
      }).success(function(data){
        callback(true, data);
      }).error(function(data){
        callback(false, data);
      });
    });
  };
  /**
   * Implementa la comunicazione con il server per il salvataggio di una nuova
   * esperienza
   * @function saveExperience
   * @memberOf Experience.ExperienceService
   * @instance
   * @param {String} name - Nome dell'esperienza
   * @param {Array} tracks - Array di percorsi
   * @param {String} from - Coordinata del punto a nord-ovest del perimetro
   * dell'esperienza, espressa in un oggetto che contiene un attributo
   * "latitude" per la latitudine e "longitude" per la longitudine.
   * @param {String} to - Coordinata del punto a sud-est del perimetro
   * dell'esperienza, espressa in un oggetto che contiene un attributo
   * "latitude" per la latitudine e "longitude" per la longitudine.
   * @param {Array} POI - Array dei punti d'interesse selezionati per
   * l'esperienza.
   * @param {Array} customPoints - Array dei punti utente creati per
   * l'esperienza.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var saveExperience = function(name, tracks, from, to, POI, customPoints,
    callback){
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
   * Implementa la comunicazione con il server per la modifica di un'esperienza
   * esistente
   * @function editExperience
   * @memberOf Experience.ExperienceService
   * @instance
   * @param {Number} experienceId - Codice identificativo dell'esperienza
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
  var editExperience = function(experienceId,
    name, tracks, from, to, POI, customPoints, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'PUT',
        url: BACKEND_URL + "/experiences/" + experienceId,
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
   * @memberOf Experience.ExperienceService
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
  /**
   * Implementa la comunicazione con il server per ottenere le informazioni
   * relative a una specifica esperienza.
   * @function getExperienceDetails
   * @memberOf Experience.ExperienceService
   * @instance
   * @param {Number} experienceId - Id dell'esperienza di cui ottenere
   * informazioni.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var getExperienceDetails = function(experienceId, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'GET',
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
  /**
   * Implementa la comunicazione con il server per ottenere le informazioni
   * relative a uno specifico percorso.
   * @function getTrackDetails
   * @memberOf Experience.ExperienceService
   * @instance
   * @param {Number} experienceId - Id dell'esperienza a cui appartiene il
   * percorso di cui ottenere informazioni.
   * @param {Number} trackId - Id del percorso di cui ottenere informazioni.
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var getTrackDetails = function(experienceId, trackId, callback){
    AuthService.authRequest(function(token){
      $http({
        method: 'GET',
        url: BACKEND_URL + "/experiences/" + experienceId + "/tracks/" +
             trackId,
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
    editExperience: editExperience,
    deleteExperience: deleteExperience,
    getExperienceDetails: getExperienceDetails,
    getTrackDetails: getTrackDetails
  };
}
