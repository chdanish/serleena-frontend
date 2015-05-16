/**
   * Name: GoogleMapsService
   * Package: Map
   * Author: Matteo Lisotto
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('map').service('GoogleMapsService', GoogleMapsService);

/**
  * Classe singleton che implementa la comunicazione con le API di Google Maps.
  *
  * @author Matteo Lisotto
  * @version 0.1
  * @constructor
  */

function GoogleMapsService() {
  /**
   * Inizializza la mappa.
   * @function initMap
   * @memberOf GoogleMapsService
   * @instance
   * @param {String} mapId - ID della mappa nel DOM.
   * @returns {Object} map - Oggetto mappa di Google Maps.
   */
  var initMap = function(mapId){
    return new google.maps.Map( document.getElementById(mapId),{
      center: { lat: 45.279642, lng: 11.652564},
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: false,
      mapTypeControl: false
    });
  };
  /**
   * Disegna sulla mappa un rettangolo editabile per selezionare il perimetro
   * dell'esperienza.
   * @function drawPerimeter
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @returns {Object} rectangle - Rettangolo disegnato.
   */
  var drawPerimeter= function(map){
    return new google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillOpacity: 0,
      map: map,
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(45.276413, 11.650587),
        new google.maps.LatLng(45.281726, 11.655550)
      ),
      editable: true,
      draggable: true,
      geodesic: true
    });
  };
  /**
   * Finalizza il perimetro rendendolo non più modificabile.
   * @function closePerimeter
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Object} rectangle - Rettangolo da rendere non modificabile.
   * @returns {Object} recBound - Oggetto contenente le coordinate nord-est e
   * sud-ovest del perimetro. Esso è organizzato con due attributi, "ne" per il
   * punto a nord-est e "sw" per il punto a sud-ovest, entrambi oggetti che
   * contengono un attributo "lat" per la latitudine e un attributo "lng" per la
   * longitudine.
   */
  var closePerimeter = function(map, rectangle){
    var recBound = rectangle.getBounds();
    map.fitBounds(recBound);
    rectangle.setOptions({
      editable: false,
      draggable: false,
      strokeColor: '#000000'
    });

    var ne = recBound.getNorthEast();
    var sw = recBound.getSouthWest();
    return {
      ne: {
        lat: ne.lat(),
        lng: ne.lng()
      },
      sw: {
        lat: sw.lat(),
        lng: sw.lng()
      }
    };
  };
  /**
   * Disegna una linea.
   * @function drawLine
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Array} path - Array di oggetti google.maps.LatLng che rappresenta
   * l'insieme dei punti che costituiscono la linea.
   * @param {String} color - Colore della linea in formato esadecimale.
   * @param {Number} opacity - Numero che rappresenta l'opacità della linea, da
   * 0.0 (trasparente) a 1.0 (nessuna opacità).
   * @param {Array} icons - Array di oggetti google.maps.IconSequence che
   * rappresenta l'insieme dei simboli con cui comporre la linea.
   */
  var drawLine = function (map, path, color, opacity, icons){
    return new google.maps.Polyline({
      path: path,
      strokeColor: color,
      strokeOpacity: opacity,
      icons: icons,
      map: map
    });
  };

  return {
    initMap: initMap,
    drawPerimeter: drawPerimeter,
    closePerimeter: closePerimeter
  };
}
