/**
   * Name: ExperienceDetailsController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('experience').controller('ExperienceDetailsController',
					ExperienceDetailsController);
/**
  * Classe per la gestione della visualizzazione dei dettagli relativi a
  * un’esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} $routeParams - Service che gestisce il recupero dei
  * parametri passati via url.
  * @param {Service} ExperienceService - Service che gestisce la comunicazione
  * con il backend per quanto riguarda la gestione delle esperienze.
  * @param {Provider} Map - Provider che fornisce l'instanza del gestore della
  * mappa.
  */

function ExperienceDetailsController($scope, $routeParams, ExperienceService,
    Map) {
  /**
   * Indice dell'esperienza di cui visualizzare i dettagli.
   *
   * @name experienceId
   * @type Number
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.experienceId = $routeParams.experienceId;
  /**
   * Oggetto contenente le informazioni dell'esperienza.
   *
   * @name experience
   * @type Object
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.experience = {};
  /**
   * Oggetto contenente le varie mappe visualizzate.
   *
   * @name maps
   * @type Object
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.maps = {};
  /**
   * Indice del percorso attualmente visualizzato.
   *
   * @name currentTrackIndex
   * @type Number
   * @default -1
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.currentTrackIndex = -1;
  /**
   * Oggetto mappa del percorso attualmente visualizzato.
   *
   * @name currentTrackDraw
   * @type Object
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.currentTrackDraw = null;
  /**
   * Array contenente i checkpoint creati dalla mappa e appartenenti al
   * percorso attualmente visualizzato.
   *
   * @name currentCheckpoints
   * @type Array
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.currentCheckpoints = [];
}
