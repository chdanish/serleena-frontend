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
   * Name: WizardStepDirective
   * Package: Wizard
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 1.0.0        Matteo Lisotto       Create file
   *
   */

angular.module('wizard').directive('hhWizardStep', WizardStepDirective);

/**
  * Classe che realizza il componente grafico di un passaggio di una generica
  * procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Viene utilizzato per rappresentare graficamente dei passaggi nella
  * creazione e modifica di un’esperienza. Al momento della creazione si
  * registra a WizardDirectiveController.
  * @constructor
  * @memberOf Wizard
  */

function WizardStepDirective() {
  var directive = {
    /**
     * Variabile che permette di indicare una directive padre, il cui cui
     * controller gestirà la directive chiamante (WizardStepDirective).
     *
     * @name require
     * @type String
     * @memberOf Wizard.WizardStepDirective
     * @instance
     */
    require: '^hhWizard',
    /**
     * Variabile che permette di limitare l'uso della directive in un
     * particolare tipo di entità del DOM, a scelta tra attributo, elemento o
     * classe.
     *
     * @name restrict
     * @type String
     * @default E
     * @memberOf Wizard.WizardStepDirective
     * @instance
     */
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: true,
    /**
     * URL della pagina HTML separata che andrà a rimpiazzare il codice della
     * directive.
     *
     * @name templateUrl
     * @type String
     * @memberOf Wizard.WizardStepDirective
     * @instance
     */
    templateUrl: 'app/wizard/wizardstepdirective.view.html',
    /**
       * Funzione invocata da AngularJS per inizializzare la directive. Essa,
       * in questo caso, registra sé stessa come step all'interno di
       * WizardDirectiveController.
       *
       * @function link
       * @memberOf Wizard.WizardStepDirective
       * @instance
       * @param {Scope} scope - Scope accessibile dalla directive. In questo
       * caso quello della directive padre.
       * @param {DOMElement} iElement - Oggetto che rappresenta la directive
       * all'interno del DOM della pagina.
       * @param {Object} iAttrs - Oggetto che contiene gli attributi della
       * directive, nel formato chiave-valore.
       * @param {WizardDirectiveController} wizardController - Riferimento al
       * controller generale del wizard.
      */
    link: function (scope, iElement, iAttrs, wizardController) {
      wizardController.registerStep(scope);
    }
  };

  return directive;
}
