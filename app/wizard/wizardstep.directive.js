/**
   * Name: WizardStepDirective
   * Package: Wizard
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('wizard').directive('hhWizardStep', WizardStepDirective);

/**
  * Classe che realizza il componente grafico di un passaggio di una generica
  * procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @memberOf Wizard
  */

function WizardStepDirective() {
  var directive = {
    require: '^hhWizard',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: true,
    templateUrl: 'app/wizard/wizardstepdirective.view.html',
    link: function (scope, iElement, iAttrs, wizardController) {
      wizardController.registerStep(scope);
    }
  };

  return directive;
}
