/**
   * Name: RegisterController
   * Package: Authentication
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Crea file
   * 0.0.2        Antonio Cavestro     Aggiungi metodo di registrazione
   * 0.0.3        Antonio Cavestro     Aggiungi login automatico dopo
   *                                   registrazione
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
  * @param {Service} AuthService - Servizio che gestisce l'autenticazione utente.
  */

function RegisterController($scope, UserService, AuthService) {
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
