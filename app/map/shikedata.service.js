/**
   * Name: SerleenaDataService
   * Package: Map
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('map').service('SerleenaDataService', SerleenaDataService);

/**
  * Classe singleton che implementa la comunicazione con il backend per
  * interrogare la base dati su informazioni geografiche (sentieri e punti
  * d’interesse).
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function SerleenaDataService($http, BACKEND_URL) {
  /**
   * Metodo per ottenere la lista dei sentieri in un determinato perimetro.
   *
   * @function getPaths
   * @memberOf SerleenaDataService
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
}
