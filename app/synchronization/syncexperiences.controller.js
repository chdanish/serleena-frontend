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
  * di sincronizzazione delle esperienze.
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
}
