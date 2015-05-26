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
   * Name: PasswordRecoveryController
   * Package: Authentication
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   *
   */

angular.module('authentication').controller('PasswordRecoveryController',
					    PasswordRecoveryController);

/**
  * Controller che gestisce la procedura di recupero della password utente.
  *
  * @example L’applicativo è configurato tramite App.AppConfiguration per
  * invocare questo controller quando il browser richiede la pagina di recupero
  * password utente. Con l’indirizzo email inserito, contatta il backend tramite
  * UserService per l’inoltro della richiesta.
  * @author Antonio Cavestro <antonio.cavestro@gmail.com>
  * @version 0.1
  * @constructor
  * @memberOf Authentication
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} UserService - Oggetto che gestisce la comunicazione con
  * il backend per quanto riguarda le informazioni utente.
  */

function PasswordRecoveryController($scope, UserService) {
  /**
   * Email utente
   *
   * @name email
   * @type String
   * @memberOf Authentication.PasswordRecoveryController
   * @instance
   */
  $scope.email = "";
  /**
   * Flag di completamento
   *
   * @name done
   * @type Boolean
   * @memberOf Authentication.PasswordRecoveryController
   * @default false
   * @instance
   */
  $scope.done = false;
  /**
   * Tipo di messaggio di ritorno all'utente
   *
   * @name msgType
   * @type String
   * @memberOf Authentication.PasswordRecoveryController
   * @instance
   */
  $scope.msgType = "";
  /**
   * Testo del messaggio di ritorno all'utente
   *
   * @name msgText
   * @type String
   * @memberOf Authentication.PasswordRecoveryController
   * @instance
   */
  $scope.msgText = "";
  /**
   * Innesca la chiamata al backend per il recupero della password utente.
   * @function recoverPassword
   * @memberOf Authentication.PasswordRecoveryController
   * @instance
   */
  $scope.recoverPassword = function(){
    UserService.recoverUser($scope.email, function(ok, data){
      $scope.done = true;
      if(ok){
        $scope.msgType = "primary";
        $scope.msgText = "Richiesta di recupero password inoltrata!";
      } else {
        $scope.msgType = "danger";
        $scope.msgText = "Errore nella richiesta :(";
      }
    });
  };
}
