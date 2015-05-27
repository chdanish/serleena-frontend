/**
   * Name: ExperienceListController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer       Changes
   * 0.0.1        Matteo Lisotto   Create file
   * 1.0.0        Antonio Cavestro Inserito codice per il recupero delle
   *                               esperienze e il popolamento della vista
   *
   */
angular.module('experience').controller('ExperienceListController',
					ExperienceListController);

/**
  * Classe che gestisce il popolamento e gli eventi utente di
  * ExperienceListView. Il costruttore recupera le informazioni da
  * ExperienceService e popola l'oggetto $scope con cui poi verrà aggiornata la
  * vista.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example L’applicativo è configurato tramite App.AppConfiguration per
  * invocare questo controller quando il browser richiede la pagina di
  * visualizzazione della lista delle esperienze. A questo punto, carica i dati
  * corrispondenti tramite ExperienceService e popola la vista. Da questa può
  * ricevere richieste di cancellazione da parte dell’utente che assolve
  * rimandando l’utente alla pagina dedicata (DeleteExperienceView).
  * @constructor
  * @memberOf Experience
  * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
  * controller (il model) ed in cui vengono valutate le espressioni utilizzate
  * nella view.
  * @param {Service} ExperienceService - Servizio di comunicazione con il
  * backend per la gestione delle esperienze
  */


function ExperienceListController($scope, ExperienceService) {

  ExperienceService.getExperienceList(function(ok, data){
    if(ok){
      /**
       * Array contenente le esperienze.
       *
       * @name experiences
       * @type Array
       * @memberOf Experience.ExperienceListController
       * @instance
       */
      $scope.experiences = data;
      /**
       * Numero di esperienze caricate.
       *
       * @name numExperiences
       * @type Number
       * @memberOf Experience.ExperienceListController
       * @instance
       */
      $scope.numExperiences = $scope.experiences.length;
      /**
       * Flag che indica o meno la presenza di esperienze caricate.
       *
       * @name noExperiences
       * @type Boolean
       * @memberOf Experience.ExperienceListController
       * @instance
       */
      $scope.noExperiences = $scope.numExperiences === 0;
    } else {
      /**
       * Flag che indica o meno un errore di comunicazione avvenuto su
       * ExperienceService.
       *
       * @name error
       * @type Boolean
       * @memberOf Experience.ExperienceListController
       * @instance
       */
      $scope.error = true;
      /**
       * Eventuale messaggio di errore da parte di ExperienceService.
       *
       * @name errorMsg
       * @type String
       * @memberOf Experience.ExperienceListController
       * @instance
       */
      $scope.errorMsg = "Errore di comunicazione con il server :(";
    }
    /**
     * Flag che abilita la visualizzazione di alert
     *
     * @name showAlert
     * @type Boolean
     * @memberOf Experience.ExperienceListController
     * @instance
     */
    $scope.showAlert = $scope.noExperiences || $scope.error;
  });
}
