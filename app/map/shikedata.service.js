/**
   * Name: SerleenaDataService
   * Package: Map
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 1.0.0        Matteo Lisotto       Create file
   *
   */

angular.module('map').service('SerleenaDataService', SerleenaDataService);

/**
  * Classe singleton che implementa la comunicazione con il backend per
  * interrogare la base dati su informazioni geografiche (sentieri e punti
  * d’interesse).
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Viene usato da Experience.ExperienceWizardController per ottenere
  * informazioni geografiche da disegnare sulla mappa tramite MapProvider.
  * @constructor
  * @memberOf Map
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function SerleenaDataService($http, BACKEND_URL) {
  /**
   * Metodo per ottenere la lista dei sentieri in un determinato perimetro.
   *
   * @function getPaths
   * @memberOf Map.SerleenaDataService
   * @instance
   * @param {Object} from - oggetto che rappresenta il punto a nord-est
   * dell'area di cui si vuole conoscere i sentieri, con un attributo "lat" per
   * la latitudine e un attributo "lng" per la longitudine.
   * @param {Object} to - oggetto che rappresenta il punto a sud-ovest
   * dell'area di cui si vuole conoscere i sentieri, con un attributo "lat" per
   * la latitudine e un attributo "lng" per la longitudine.
   * @param {function} callback - funzione da invocare alla ricezione della
   * risposta dal backend e a cui passare i dati ricevuti.
   */
  var getPaths = function(from, to, callback){
    $http({
      url: BACKEND_URL + "/paths/" + from.lat + ";" + from.lng + "/" + to.lat +
                                                                  ";" + to.lng,
      method: 'GET'
    }).success(function(data){
      callback(true, data.paths);
    }).error(function(data){
      callback(false, data);
    });
  };
  /**
   * Metodo per ottenere la lista dei punti d'interesse in un determinato
   * perimetro.
   *
   * @function getPOIs
   * @memberOf Map.SerleenaDataService
   * @instance
   * @param {Object} from - oggetto che rappresenta il punto a nord-est
   * dell'area di cui si vuole conoscere i punti d'interesse, con un attributo
   * "lat" per la latitudine e un attributo "lng" per la longitudine.
   * @param {Object} to - oggetto che rappresenta il punto a sud-ovest
   * dell'area di cui si vuole conoscere i punti d'interesse, con un attributo
   * "lat" per la latitudine e un attributo "lng" per la longitudine.
   * @param {function} callback - funzione da invocare alla ricezione della
   * risposta dal backend e a cui passare i dati ricevuti.
   */
  var getPOIs = function(from, to, callback){
    $http({
      url: BACKEND_URL + "/poi/" + from.lat + ";" + from.lng + "/" + to.lat +
                                                                  ";" + to.lng,
      method: 'GET'
    }).success(function(data){
      callback(true, data.poi);
    }).error(function(data){
      callback(false, data);
    });
  };

  return {
    getPaths: getPaths,
    getPOIs: getPOIs
  };
}
