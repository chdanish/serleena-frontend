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
}
