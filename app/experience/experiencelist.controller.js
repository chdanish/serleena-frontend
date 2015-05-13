/**
   * Name: ExperienceListController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer       Changes
   * 0.0.1        Matteo Lisotto   Create file
   * 0.0.2        Antonio Cavestro Inserito codice per il recupero delle
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
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
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
       * @memberOf ExperienceListController
       * @instance
       */
      $scope.experiences = data;
      /**
       * Numero di esperienze caricate.
       *
       * @name numExperiences
       * @type Number
       * @memberOf ExperienceListController
       * @instance
       */
      $scope.numExperiences = $scope.experiences.length;
      /**
       * Flag che indica o meno la presenza di esperienze caricate.
       *
       * @name noExperiences
       * @type Boolean
       * @memberOf ExperienceListController
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
       * @memberOf ExperienceListController
       * @instance
       */
      $scope.error = true;
      /**
       * Eventuale messaggio di errore da parte di ExperienceService.
       *
       * @name errorMsg
       * @type String
       * @memberOf ExperienceListController
       * @instance
       */
      $scope.errorMsg = "Errore di comunicazione con il server :(";
    }
    /**
     * Flag che abilita la visualizzazione di alert
     *
     * @name showAlert
     * @type Boolean
     * @memberOf ExperienceListController
     * @instance
     */
    $scope.showAlert = $scope.noExperiences || $scope.error;
  });
}
