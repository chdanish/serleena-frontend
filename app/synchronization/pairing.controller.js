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
   * Name: PairingController
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa controller
   *
   */

angular.module('synchronization').controller('PairingController', PairingController);

/**
  * Classe che gestisce la procedura di pairing.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @example L’applicativo è configurato tramite App.AppConfiguration per invocare
  * questo controller quando il browser richiede la pagina di pairing. Con i
  * dati ricevuti da PairingView, effettua una richiesta al backend tramite
  * PairingService. Successivamente aggiorna la vista con l’esito
  * dell’operazione.
  *
  * @constructor
  * @memberOf Synchronization
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} PairingService - Servizio che gestisce la comunicazione con
  * il backend relativa alla gestione dell'accoppiamento con serleena.
  * @param {Service} $route - Provider di AngularJS per agire sulla route
  * corrente.
  */

function PairingController($scope, PairingService, $route) {
  /**
   * Token temporaneo
   *
   * @name tempToken
   * @type String
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.tempToken = "";
  /**
   * Flag che indica se la View deve visualizzare un messaggio di successo.
   *
   * @name showSuccess
   * @type Boolean
   * @default false
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.showSuccess = false;
  /**
   * Flag che indica se la View deve visualizzare un messaggio di errore.
   *
   * @name showError
   * @type Boolean
   * @default false
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.showError = false;
  /**
   * Variabile utilizzata dalla View per stabilire il testo del messaggio
   * di errore da visualizzare.
   *
   * @name errorMsg
   * @type String
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.errorMsg = "";
  /**
   * Metodo invocato dalla vista per eseguire l'accoppiamento.
   *
   * @function pairDevice
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.pairDevice = function(){
    PairingService.pairDevice($scope.tempToken, function(ok, data){
      if(ok){
        $scope.showSuccess = true;
      } else {
        $scope.showError = true;
        $scope.errorMsg = "Errore durante la procedura di accoppiamento :(";
      }
    });
  };
  /**
   * Metodo invocato dalla vista per ricominciare la procedura di accoppiamento.
   *
   * @function retry
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.retry = function(){
    $route.reload();
  };
}
