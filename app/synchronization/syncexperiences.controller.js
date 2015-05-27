/**
   * Name: SyncExperiencesController
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   * 1.0.0        Antonio Cavestro    Implementa controller
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
  * @version 1.0
  * @example L’applicativo è configurato tramite App.AppConfiguration per invocare
  * questo controller quando il browser richiede la pagina di impostazione della
  * lista di esperienze da sincronizzare. Carica la lista salvata nel backend
  * invocando SyncExperiencesService. Quando l’utente ha eseguito le modifiche,
  * viene notificato da SyncExperiencesView e provvede a chiamare il service per
  * l’aggiornamento remoto.
  *
  * @constructor
  * @memberOf Synchronization
  * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
  * controller (il model) ed in cui vengono valutate le espressioni utilizzate
  * nella view.
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
   * @memberOf Synchronization.SyncExperiencesController
   * @instance
   */
  $scope.experiences = [];
  /**
   * Flag per abilitare o meno la visualizzazione dei messaggi nella vista.
   *
   * @name showMsg
   * @type Boolean
   * @default false
   * @memberOf Synchronization.SyncExperiencesController
   * @instance
   */
  $scope.showMsg = false;
  /**
   * Stringa contenente la tipologia di messaggio che la vista deve
   * visualizzare.
   *
   * @name msgType
   * @type String
   * @memberOf Synchronization.SyncExperiencesController
   * @instance
   */
  $scope.msgType = "";
  /**
   * Stringa contenente il testo del messaggio che la vista deve
   * visualizzare.
   *
   * @name msgText
   * @type String
   * @memberOf Synchronization.SyncExperiencesController
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
  /**
   * Funzione invocata dalla vista per eseguire l'aggiornamento della lista di
   * sincronizzazione.
   * @function saveList
   * @memberOf Synchronization.SyncExperiencesController
   * @instance
   */
  $scope.saveList = function(){
    SyncExperiencesService.setSyncList($scope.experiences, function(ok, data){
      $scope.showMsg = true;
      if(ok){
        $scope.msgType = "success";
        $scope.msgText = "Lista aggiornata!";
      } else {
        $scope.msgType = "danger";
        $scope.msgText = "Errore nell'aggiornamento della lista :(";
      }
    });
  };
}
