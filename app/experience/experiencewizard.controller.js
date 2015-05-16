/**
   * Name: ExperienceWizardController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   *
   */

angular.module('experience').controller('ExperienceWizardController',
					ExperienceWizardController);
/**
  * Classe che gestisce la procedura guidata di creazione e modifica di
  * un’esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Provider} Map - Provider che fornisce l'instanza del gestore della
  * mappa.
  * @param {Service} SerleenaDataService - Servizio per ottenere dati geografici
  * dal database del backend.
  */


function ExperienceWizardController($scope, Map, SerleenaDataService) {
  /**
   * Nome dell'esperienza
   *
   * @name expName
   * @type String
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.expName = "";
  /**
   * Id del tag html di MapDirective
   *
   * @name mapTagId
   * @type String
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.mapTagId = "";
  /**
   * Gestisce l'evento hhMapLink lanciato da MapDirective, in modo da poter
   * ottenere l'Id di quest'ultima.
   *
   * @function linkMap
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   * @param {Object} event - Evento che è stato lanciato (hhMapLink)
   * @param {String} elementId - Id del tag html di MapDirective.
   */
  var linkMap = function(event, elementId) {
    $scope.mapTagId = elementId;
  };
  /**
   * Funzione da eseguire dopo il completamento dello step di inserimento del
   * nome esperienza. Essa visualizza la mappa e disegna il rettangolo con cui
   * selezionare il perimetro.
   *
   * @function afterInsertName
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   */
  var afterInsertName= function(){
    $scope.showMap = true;
    $scope.map = Map.initMap($scope.mapTagId);
    $scope.rectangle = Map.drawPerimeter($scope.map);
  };
  $scope.$on('hhMapLink', linkMap);
}
