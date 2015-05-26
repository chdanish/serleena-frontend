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
