/**
   * Name: MapDirective
   * Package: Map
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 1.0.0        Antonio Cavestro     Implementa directive secondo DP
   *
   */

angular.module('map').directive('hhMap', MapDirective);

/**
  * Classe che realizza il componente grafico di una generica mappa.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @memberOf Map
  * @example Al momento della creazione, all’interno di
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
