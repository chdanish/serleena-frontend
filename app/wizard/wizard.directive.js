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

angular.module('wizard').directive('hhWizard', WizardDirective);

/**
  * Classe che realizza il componente grafico di una generica procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @example Viene utilizzato per rappresentare graficamente la procedura di
  * creazione e modifica di un’esperienza. Viene creata all’interno di
  * Experience.ExperienceWizardView e contiene molte istanze di
  * WizardStepDirective.
  * @constructor
  * @memberOf Wizard
  */

function WizardDirective() {
  var directive = {
    /**
     * Variabile che permette di limitare l'uso della directive in un
     * particolare tipo di entità del DOM, a scelta tra attributo, elemento o
     * classe.
     *
     * @name restrict
     * @type String
     * @default E
     * @memberOf Wizard.WizardDirective
     * @instance
     */
    restrict: 'E',
    /**
     * Nome del controller che gestisce la directive.
     *
     * @name controller
     * @type String
     * @memberOf Wizard.WizardDirective
     * @instance
     */
    controller: 'WizardDirectiveController',
    transclude: true,
    replace: true,
    /**
     * URL della pagina HTML separata che andrà a rimpiazzare il codice della
     * directive.
     *
     * @name templateUrl
     * @type String
     * @memberOf Wizard.WizardDirective
     * @instance
     */
    templateUrl: 'app/wizard/wizarddirective.view.html',
    /**
       * Funzione invocata da AngularJS per inizializzare la directive. Essa,
       * in questo caso, attiva il primo step del wizard.
       *
       * @function link
       * @memberOf Wizard.WizardDirective
       * @instance
       * @param {Scope} scope - Scope accessibile dalla directive. In questo
       * caso quello del controller che la gestisce.
       * @param {DOMElement} iElement - Oggetto che rappresenta la directive
       * all'interno del DOM della pagina.
       * @param {Object} iAttrs - Oggetto che contiene gli attributi della
       * directive, nel formato chiave-valore.
      */
    link: function (scope, iElement, iAttrs) {
      scope.steps[scope.currentStepIndex].currentStep = true;
    }
  };
  return directive;
}
