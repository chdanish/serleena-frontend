/**
   * Name: WizardDirective
   * Package: Wizard
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('wizard').directive('WizardDirective', WizardDirective);

/**
  * Classe che realizza il componente grafico di una generica procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  */

function WizardDirective() {
  var directive = {
    restrict: 'E',
    controller: 'WizardDirectiveController',
    transclude: true,
    replace: true,
    templateUrl: 'app/wizard/wizarddirective.view.html',
    link: function (scope, iElement, iAttrs) {
      scope.steps[scope.currentStepIndex].currentStep = true;
    }
  };
  return directive;
}
