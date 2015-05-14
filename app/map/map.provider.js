/**
   * Name: MapProvider
   * Package: Map
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer       Changes
   * 0.0.1        Matteo Lisotto   Create file
   *
   */

angular.module('map').provider('Map', MapProvider);

/**
  * Classe singleton che realizza un’astrazione del servizio con cui interagire
  * con il gestore alla mappa, in modo da disaccoppiarlo dal resto
  * dell’applicazione.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  */

function MapProvider() {
  var mapType = "GoogleMaps";

  this.setMapType = function(map){
    mapType = map;
  };

  this.$get = function(){
    if(mapType == "GoogleMaps"){
      return new GoogleMapsService();
    } else {
      return null;
    }
  };

}
