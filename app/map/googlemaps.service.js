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
  /**
   * Disegna un sentiero.
   * @function drawPath
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {String} name - Nome del sentiero.
   * @param {Array} points - Array di oggetti punti, entrambi costituiti da
   * un attributo "lat" per la latitudine, e un attributo "lng" per la
   * longitudine.
   */
  var drawPath = function(map, name, points){
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    var gmapPoints = [];
    points.forEach(function(p){
      gmapPoints.push(new google.maps.LatLng(p.lat, p.lng));
    });
    drawLine(map, gmapPoints, '#994C00', 0, [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]);
  };
  /**
   * Disegna un marker
   * @function drawMarker
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Object} position - Oggetto google.maps.LatLng che rappresenta la
   * posizione del marker
   * @param {Object} icon - Oggetto che rappresenta l'icona del marker.
   * La documentazione di Gooogle Maps API v3 specifica che esso può essere di
   * tre tipi distinti: String, google.maps.Icon oppure google.maps.Symbol.
   * @param {Boolean} draggable - Flag che indica se il marker può essere
   * spostato nella mappa oppure no.
   * @param {String} title - Nome del marker
   */
  var drawMarker = function(map, position, icon, draggable, title){
    return new google.maps.Marker({
      position: position,
      icon: icon,
      title: title,
      draggable: draggable,
      map: map
    });
  };

  return {
    initMap: initMap,
    drawPerimeter: drawPerimeter,
    closePerimeter: closePerimeter
  };
}
