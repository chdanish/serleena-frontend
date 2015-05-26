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
   * Name: MapDirective
   * Package: Map
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa directive secondo DP
   *
   */

angular.module('map').directive('hhMap', MapDirective);

/**
  * Classe che realizza il componente grafico di una generica mappa.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @memberOf Map
  * @use Al momento della creazione, all’interno di
  * Experience.ExperienceWizardView, essa registra il proprio attributo id
  * presso Frontend::Experience::ExperienceWizardController, il quale provvede,
  * tramite MapProvider, a iniettare nella directive il codice fornito dal
  * gestore della mappa.
  * @constructor
  */

function MapDirective() {
  var directive = {
    /**
     * Variabile che permette di limitare l'uso della directive in un
     * particolare tipo di entità del DOM, a scelta tra attributo, elemento o
     * classe.
     *
     * @name restrict
     * @type String
     * @default E
     * @memberOf Map.MapDirective
     * @instance
     */
    restrict: 'E',
    /**
     * Scope isolato della directive, separato da quello del controller che la
     * gestisce.
     *
     * @name scope
     * @type Scope
     * @memberOf Map.MapDirective
     * @instance
     */
    scope: {},
    replace: true,
    /**
     * Codice HTML che rimpiazza il codice della directive. Dato che in questo
     * caso si tratta di qualche carattere, si è preferito inserire il codice
     * direttamente all'interno (inline) della definizione di MapDirective.
     *
     * @name template
     * @type String
     * @memberOf Map.MapDirective
     * @instance
     */
    template: '<div></div>',
      /**
       * Funzione invocata da AngularJS per inizializzare la directive. Essa,
       * in questo caso, emette un evento 'hhMapLink' che permette al controller
       * che la gestisce di rintracciarne l'id e inizializzarne il contenuto
       * tramite MapProvider.
       *
       * @function link
       * @memberOf Map.MapDirective
       * @instance
       * @param {Scope} scope - Scope accessibile dalla directive. In questo
       * caso (scope isolato), si tratta del proprio.
       * @param {DOMElement} element - Oggetto che rappresenta la directive
       * all'interno del DOM della pagina.
      */
    link: function(scope, element){
      scope.$emit('hhMapLink', element[0].id);
    }
  };

  return directive;
}
