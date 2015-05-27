/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


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
