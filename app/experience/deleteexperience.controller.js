/**
   * Name: DeleteExperienceController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Antonio Cavestro    Create file
   * 1.0.0		  Antonio Cavestro	  Implementa classe
   *
   */

angular.module("experience").controller("DeleteExperienceController",
	DeleteExperienceController);

/**
  * Classe che gestisce la cancellazione di un'esperienza.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example L’applicativo è configurato tramite App.AppConfiguration per invocare
  * questo controller quando il browser richiede la pagina di conferma della
  * cancellazione di un’esperienza. Gestisce gli eventi utente avvenuti tramite
  * DeleteExperienceView.
  * @constructor
  * @memberOf Experience
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} $routeParams - Service che gestisce il recupero dei
  * parametri passati via url.
  * @param {Service} ExperienceService - Service che gestisce la comunicazione
  * con il backend per quanto riguarda la gestione delle esperienze.
  */

function DeleteExperienceController($scope, $routeParams, ExperienceService){
	/**
     * Id dell'esperienza da cancellare.
     *
     * @name experienceId
     * @type Number
     * @memberOf Experience.DeleteExperienceController
     * @instance
     */
	$scope.experienceId = $routeParams.experienceId;
	/**
     * Flag per determinare se è stata effettuata la richiesta di cancellazione.
     *
     * @name deleteRequested
     * @type Boolean
     * @default false
     * @memberOf Experience.DeleteExperienceController
     * @instance
     */
	$scope.deleteRequested = false;
	/**
     * Variabile che indica il tipo di risposta ottenuta dal backend.
     *
     * @name responseType
     * @type String
     * @memberOf Experience.DeleteExperienceController
     * @instance
     */
	$scope.responseType = "";
	/**
     * Variabile che contiene il messaggio ottenuto dal backend.
     *
     * @name responseMsg
     * @type String
     * @memberOf Experience.DeleteExperienceController
     * @instance
     */
	$scope.responseMsg = "";
	/**
	 * Funzione invocata dalla vista per confermare la cancellazione
	 * dell'esperienza.
	 *
	 * @function deleteExperience
	 * @memberOf Experience.DeleteExperienceController
	 * @instance
	 */
	$scope.deleteExperience = function(){
		ExperienceService.deleteExperience($scope.experienceId, function(ok, data){
			$scope.deleteRequested = true;
			if(ok){
				$scope.responseType = "success";
				$scope.responseMsg = "Esperienza cancellata.";
			} else {
				$scope.responseType = "danger";
				$scope.responseMsg = "Errore nella cancellazione dell'esperienza. :(";
			}
		});
	};
}
