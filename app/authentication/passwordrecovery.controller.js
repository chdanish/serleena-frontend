/**
   * Name: PasswordRecoveryController
   * Package: Authentication
   * Author: Antonio Cavestro
   * Date: 2015-05-08
   *
   * History:
   * Version      Programmer       Date          Changes
   * 0.0.1        Matteo Lisotto   2015-05-08    Create file
   *
   */

/**
 * @namespace Authentication
 */

angular.module('authentication').controller('PasswordRecoveryController',
					    PasswordRecoveryController);

/**
  * Controller che gestisce la procedura di recupero della password utente.
  *
  * @author Antonio Cavestro <antonio.cavestro@gmail.com>
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} UserService - Oggetto che gestisce la comunicazione con
  * il backend per quanto riguarda le informazioni utente.
  */

function PasswordRecoveryController($scope, UserService) {
}
