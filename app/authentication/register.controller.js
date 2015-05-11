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
   * Name: RegisterController
   * Package: Authentication
   * Author: Antonio Cavestro
   * Date: 2015-05-08
   *
   * History:
   * Version      Programmer       Date          Changes
   * 0.0.1        Matteo Lisotto   2015-05-08    Crea file
   * 0.0.2        Antonio Cavestro 2015-05-11    Aggiungi metodo di
   *                                             registrazione
   *
   */

/**
 * @namespace Authentication
 */

angular.module('authentication').controller('RegisterController', RegisterController);

/**
  * Controller che gestisce la registrazione dell'utente
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} UserService - Servizio che gestisce le informazioni utente.
  */

function RegisterController($scope, UserService) {
  /**
   * Email utente
   *
   * @name email
   * @type String
   * @memberOf RegisterController
   * @instance
   */
  $scope.email = "";
  /**
   * Password utente
   *
   * @name password
   * @type String
   * @memberOf RegisterController
   * @instance
   */
  $scope.password = "";
  /**
   * Flag di completamento della registrazione
   *
   * @name done
   * @type Boolean
   * @default false
   * @memberOf RegisterController
   * @instance
   */
  $scope.done = false;
  /**
   * Flag dell'esito positivo della registrazione
   *
   * @name enableNext
   * @type Boolean
   * @default false
   * @memberOf RegisterController
   * @instance
   */
  $scope.enableNext = false;
  /**
   * Tipo di messaggio di output verso la vista
   *
   * @name msgType
   * @type String
   * @memberOf RegisterController
   * @instance
   */
  $scope.msgType = "";
  /**
   * Messaggio di output verso la vista
   *
   * @name msgText
   * @type String
   * @memberOf RegisterController
   * @instance
   */
  $scope.msgText = "";

  /**
   * Effettua registrazione utente.
   * @function registerUser
   * @memberOf RegisterController
   * @instance
   */
  $scope.registerUser = function(){
    UserService.registerUser($scope.email, $scope.password, function(ok, data) {
      if(ok){
        // Passa al pairing
        $scope.done = true;
        $scope.enableNext = true;
        // jshint multistr:true
        $scope.msgText = "Registrazione effettuata! Prosegui abbinando il tuo \
                            dispositivo a serleena Cloud";
        $scope.msgType = "success";
      } else {
        // errore
        $scope.done = true;
        $scope.msgText = "Errore nella registrazione :(";
        $scope.msgType = "danger";
      }
    });
  };
}
