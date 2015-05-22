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
  * @constructor
  */

function MapDirective() {
  var directive = {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div></div>',
    link: function(scope, element){
      scope.$emit('hhMapLink', element[0].id);
    }
  };

  return directive;
}
