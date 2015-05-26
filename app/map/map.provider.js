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
  * @memberOf Map
  * @version 0.1
  * @example Viene utilizzato da Experience.ExperienceWizardController, il quale gli
  * comunica l’attributo id di MapDirective. Esso, a seconda della
  * configurazione dell’applicativo, stabilita App.AppConfiguration, istanzia un
  * service concreto, ad esempio GoogleMapsService, e lo ritorna a
  * Experience.ExperienceWizardController. È dunque un’implementazione del
  * design pattern Factory Method.
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
