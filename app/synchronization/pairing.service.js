/**
   * Name: PairingService
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('synchronization').service('PairingService', PairingService);

/**
  * Classe singleton che gestisce le chiamate al backend relative al pairing.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function PairingService($http, BACKEND_URL) {
}
