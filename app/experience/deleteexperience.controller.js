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
   *
   */

angular.module("experience").controller("DeleteExperienceController",
	DeleteExperienceController);

/**
  * Classe che gestisce la cancellazione di un'esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} $routeParams - Service che gestisce il recupero dei
  * parametri passati via url.
  */

function DeleteExperienceController($scope, $routeParams){
	/**
     * Id dell'esperienza da cancellare.
     *
     * @name experienceId
     * @type Number
     * @memberOf DeleteExperienceController
     * @instance
     */
	$scope.experienceId = $routeParams.experienceId;
	/**
     * Flag per determinare se è stata effettuata la richiesta di cancellazione.
     *
     * @name deleteRequested
     * @type Boolean
     * @default false
     * @memberOf DeleteExperienceController
     * @instance
     */
	$scope.deleteRequested = false;
	/**
     * Variabile che indica il tipo di risposta ottenuta dal backend.
     *
     * @name responseType
     * @type String
     * @memberOf DeleteExperienceController
     * @instance
     */
	$scope.responseType = "";
}
