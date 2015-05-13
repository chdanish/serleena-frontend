/**
   * Name: ExperienceListController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer       Changes
   * 0.0.1        Matteo Lisotto   Create file
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
}
