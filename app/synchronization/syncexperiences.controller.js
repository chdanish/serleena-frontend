/**
   * Name: SyncExperiencesController
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   *
   */

angular.module('synchronization').controller('SyncExperiencesController',
					     SyncExperiencesController);
/**
  * Classe che gestisce la procedura di visualizzazione e modifica della lista
  * di sincronizzazione delle esperienze. Il costruttore popola l'array delle
  * esperienze che viene visualizzato nella vista.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} SyncExperiencesService - Service che implementa la
  * comunicazione con backend per quanto riguarda la gestione della lista di
  * esperienze da sincronizzare.
  */

function SyncExperiencesController($scope, SyncExperiencesService) {
  /**
   * Array contenente le esperienze con le informazioni relative all'effettiva
   * o meno abilitazione alla sincronizzazione.
   *
   * @name experiences
   * @type Array
   * @memberOf SyncExperiencesController
   * @instance
   */
  $scope.experiences = [];
  /**
   * Flag per abilitare o meno la visualizzazione dei messaggi nella vista.
   *
   * @name showMsg
   * @type Boolean
   * @default false
   * @memberOf SyncExperiencesController
   * @instance
   */
  $scope.showMsg = false;
  /**
   * Stringa contenente la tipologia di messaggio che la vista deve
   * visualizzare.
   *
   * @name msgType
   * @type String
   * @memberOf SyncExperiencesController
   * @instance
   */
  $scope.msgType = "";
  /**
   * Stringa contenente il testo del messaggio che la vista deve
   * visualizzare.
   *
   * @name msgText
   * @type String
   * @memberOf SyncExperiencesController
   * @instance
   */
  $scope.msgText = "";

  SyncExperiencesService.getSyncList(function(ok, data){
    if(ok){
      $scope.experiences = data;
    } else {
      $scope.showMsg = true;
      $scope.msgType = "danger";
      $scope.msgText = "Impossibile caricare la lista di sincronizzazione :(";
    }
  });
}
