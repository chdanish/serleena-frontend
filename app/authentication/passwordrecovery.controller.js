/**
   * Name: PasswordRecoveryController
   * Package: Authentication
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 1.0.0        Matteo Lisotto      Create file
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
  * @version 1.0
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
