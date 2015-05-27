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
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Crea file
   * 0.0.2        Antonio Cavestro     Aggiungi metodo di registrazione
   * 1.0.0        Antonio Cavestro     Aggiungi login automatico dopo
   *                                   registrazione
   *
   */

angular.module('authentication').controller('RegisterController', RegisterController);

/**
  * Controller che gestisce la registrazione dell'utente
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example L’applicativo è configurato tramite Frontend::App::AppConfiguration
  * per invocare questo controller quando il browser richiede la pagina di
  * registrazione. Una volta che l’utente inserisce e conferma i dati, esso
  * procede alla validazione e, in caso positivo, effettua la richiesta di
  * registrazione al backend tramite UserService.
  * @constructor
  * @memberOf Authentication
  * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
  * controller (il model) ed in cui vengono valutate le espressioni utilizzate
  * nella view.
  * @param {Service} UserService - Servizio che gestisce le informazioni utente.
  * @param {Service} AuthService - Servizio che gestisce l'autenticazione utente.
  */

function RegisterController($scope, UserService, AuthService) {
  /**
   * Email utente
   *
   * @name email
   * @type String
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.email = "";
  /**
   * Password utente
   *
   * @name password
   * @type String
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.password = "";
  /**
   * Flag di completamento della registrazione
   *
   * @name done
   * @type Boolean
   * @default false
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.done = false;
  /**
   * Flag dell'esito positivo della registrazione
   *
   * @name enableNext
   * @type Boolean
   * @default false
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.enableNext = false;
  /**
   * Tipo di messaggio di output verso la vista
   *
   * @name msgType
   * @type String
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.msgType = "";
  /**
   * Messaggio di output verso la vista
   *
   * @name msgText
   * @type String
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.msgText = "";

  /**
   * Effettua registrazione utente.
   * @function registerUser
   * @memberOf Authentication.RegisterController
   * @instance
   */
  $scope.registerUser = function(){
    UserService.registerUser($scope.email, $scope.password, function(ok, data) {
      if(ok){
        //Autenticati
        AuthService.loginUser($scope.email, $scope.password, function(ok, data){
          if(ok){
            // Passa al pairing
            $scope.done = true;
            $scope.enableNext = true;
            // jshint multistr:true
            $scope.msgText = "Registrazione effettuata! Prosegui abbinando il tuo \
                                dispositivo a serleena Cloud";
            $scope.msgType = "success";
          } else {
            $scope.done = true;
            $scope.msgText = "Registrazione avvenuta ma non è stato possibile \
                              autenticare l'utente. Contattare un amminsitratore :(";
            $scope.msgType = "danger";
          }
        });
      } else {
        // errore
        $scope.done = true;
        $scope.msgText = "Errore nella registrazione :(";
        $scope.msgType = "danger";
      }
    });
  };
}
