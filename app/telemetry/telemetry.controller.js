/**
   * Name: TelemetryController
   * Package: Telemetry
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('telemetry').controller('TelemetryController',
				       TelemetryController);

/**
  * Classe che gestisce la visualizzazione di un tracciamento di una determinata
  * esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} ExperienceService - Servizio di comunicazione con il
  * backend per la gestione delle esperienze.
  * @param {Service} TelemetryService - Servizio di comunicazione con il
  * backend per la gestione dei tracciamenti.
  * @param {Service} $routeParams - Servizio di AngularJS per ottenere parametri
  * relativi alla route che ha attivato il controller.
  */

function TelemetryController($scope, ExperienceService, TelemetryService,
  $routeParams) {
}
