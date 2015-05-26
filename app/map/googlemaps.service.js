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
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa file secondo DP
   *
   */

angular.module('map').service('GoogleMapsService', GoogleMapsService);

/**
  * Classe singleton che implementa la comunicazione con le API di Google Maps.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @memberOf Map
  * @use Supporto alle interazioni dell’utente nella mappa di creazione e
  * modifica di un’esperienza, oltre che nella visualizzazione dei dettagli
  * esperienza.
  * @constructor
  */

function GoogleMapsService() {
  /**
   * Inizializza la mappa.
   * @function initMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {String} mapId - ID della mappa nel DOM.
   * @returns {google.maps.Map} map - Oggetto mappa di Google Maps.
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
   * Inizializza la mappa a partire dal perimetro dato.
   * @function initMapFromPerimeter
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {String} mapId - ID della mappa nel DOM.
   * @param {Object} ne - Oggetto che rappresenta il punto a nord-est del
   * perimetro dell'esperienza. Contiene un attributo "lat" con la latitudine
   * e un attributo "lng" con la longitudine.
   * @param {Object} sw - Oggetto che rappresenta il punto a sud-ovest del
   * perimetro dell'esperienza. Contiene un attributo "lat" con la latitudine
   * e un attributo "lng" con la longitudine.
   * @returns {google.maps.Map} map - Oggetto mappa di Google Maps.
   */
  var initMapFromPerimeter = function(mapId, ne, sw){
    var perimeter = new google.maps.LatLngBounds(
        new google.maps.LatLng(ne.lat, ne.lng),
        new google.maps.LatLng(sw.lat, sw.lng));
    var map = new google.maps.Map( document.getElementById(mapId),{
      center: perimeter.getCenter(),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: false,
      mapTypeControl: false
    });
    map.fitBounds(perimeter);
    return map;
  };
  /**
   * Disegna sulla mappa un rettangolo editabile per selezionare il perimetro
   * dell'esperienza.
   * @function drawPerimeter
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @returns {google.maps.Rectangle} rectangle - Rettangolo disegnato.
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
   * Disegna sulla mappa un rettangolo non editabile a partire dalle coordinate
   * dei punti a nord-est e sud-ovest di uno specifico perimetro.
   * @function drawPerimeterFromBounds
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Object} ne - Oggetto che rappresenta il punto a nord-est del
   * perimetro dell'esperienza. Contiene un attributo "lat" con la latitudine
   * e un attributo "lng" con la longitudine.
   * @param {Object} sw - Oggetto che rappresenta il punto a sud-ovest del
   * perimetro dell'esperienza. Contiene un attributo "lat" con la latitudine
   * e un attributo "lng" con la longitudine.
   * @returns {google.maps.Rectangle} rectangle - Rettangolo disegnato.
   */
  var drawPerimeterFromBounds = function(map, ne, sw){
    return new google.maps.Rectangle({
      strokeColor: '#000000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillOpacity: 0,
      map: map,
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(ne.lat, ne.lng),
        new google.maps.LatLng(sw.lat, sw.lng)
      ),
      editable: false,
      draggable: false,
      geodesic: true
    });
  };
  /**
   * Abilita la modifica del perimetro.
   * @function enablePerimeterEditing
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {google.maps.Rectangle} rectangle - Rettangolo da rendere modificabile.
   */
  var enablePerimeterEditing = function(rectangle){
    rectangle.setOptions({
      editable: true,
      draggable: true,
      strokeColor: '#FF0000'
    });
  };
  /**
   * Finalizza il perimetro rendendolo non più modificabile.
   * @function closePerimeter
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {google.maps.Rectangle} rectangle - Rettangolo da rendere non modificabile.
   * @returns {Object} recBound - Oggetto contenente le coordinate nord-est e
   * sud-ovest del perimetro. Esso è organizzato con due attributi, "ne" per il
   * punto a nord-est e "sw" per il punto a sud-ovest, entrambi oggetti che
   * contengono un attributo "lat" per la latitudine e un attributo "lng" per la
   * longitudine.
   */
  var closePerimeter = function(map, rectangle){
    // TODO Bisognerebbe pure disabilitare zoom e drag della mappa
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
   * @memberOf Map.GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Array} path - Array di oggetti google.maps.LatLng che rappresenta
   * l'insieme dei punti che costituiscono la linea.
   * @param {String} color - Colore della linea in formato esadecimale.
   * @param {Number} opacity - Numero che rappresenta l'opacità della linea, da
   * 0.0 (trasparente) a 1.0 (nessuna opacità).
   * @param {Array} icons - Array di oggetti google.maps.IconSequence che
   * rappresenta l'insieme dei simboli con cui comporre la linea.
   * @returns {google.maps.Polyline} - Un riferimento all'oggetto che
   * rappresenta la linea disegnata.
   */
  var drawLine = function (map, path, color, opacity, icons){
    if (icons === null){
      return new google.maps.Polyline({
        path: path,
        strokeColor: color,
        strokeOpacity: opacity,
        map: map
      });
    } else {
      return new google.maps.Polyline({
        path: path,
        strokeColor: color,
        strokeOpacity: opacity,
        icons: icons,
        map: map
      });
    }
  };
  /**
   * Disegna un sentiero.
   * @function drawPath
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
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
   * @memberOf Map.GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {google.maps.LatLng} position - Oggetto che rappresenta la
   * posizione del marker
   * @param {Object} icon - Oggetto che rappresenta l'icona del marker.
   * La documentazione di Gooogle Maps API v3 specifica che esso può essere di
   * tre tipi distinti: String, google.maps.Icon oppure google.maps.Symbol.
   * @param {Boolean} draggable - Flag che indica se il marker può essere
   * spostato nella mappa oppure no.
   * @param {String} title - Nome del marker
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * marker nella mappa.
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
  /**
   * Disegna un punto d'interesse
   * @function drawPOI
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Number} lat - Latitudine del punto.
   * @param {Number} lng - Longitudine del punto.
   * @param {String} name - Nome del punto d'interesse.
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * punto d'interesse nella mappa.
   */
  var drawPOI = function(map, lat, lng, name){
    return drawMarker(map, new google.maps.LatLng(lat, lng), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      strokeColor: 'red',
      strokeOpacity: 0.7,
      scale: 3
    }, false, name);
  };
  /**
   * Disegna un checkpoint di un percorso.
   * @function drawCheckpoint
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @returns {google.maps.Marker} - Riferimento all'oggetto marker che
   * costituisce un checkpoint.
   */
  var drawCheckpoint = function(map){
    return drawMarker(map, map.getCenter(), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'yellow',
      strokeColor: 'yellow',
      strokeOpacity: 0.7,
      scale: 3
    }, true);
  };
  /**
   * Disegna un checkpoint a partire da una posizione data.
   * @function drawCheckpointFromPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Number} lat - Latitudine del checkpoint.
   * @param {Number} lng - Longitudine del checkpoint.
   * @returns {google.maps.Marker} - Riferimento all'oggetto marker che
   * costituisce un checkpoint.
   */
  var drawCheckpointFromPosition = function(map, lat, lng){
    return drawMarker(map, new google.maps.LatLng(lat, lng), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'yellow',
      strokeColor: 'yellow',
      strokeOpacity: 0.7,
      scale: 3
    }, false);
  };
  /**
   * Crea un checkpoint a partire da una posizione data, senza associarlo a una
   * specifica mappa.
   * @function createEditableCheckpointFromPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {Number} lat - Latitudine del checkpoint.
   * @param {Number} lng - Longitudine del checkpoint.
   * @returns {google.maps.Marker} - Riferimento all'oggetto marker che
   * costituisce un checkpoint.
   */
  var createEditableCheckpointFromPosition = function(lat, lng){
    return drawMarker(null, new google.maps.LatLng(lat, lng), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'yellow',
      strokeColor: 'yellow',
      strokeOpacity: 0.7,
      scale: 3
    }, true);
  };
  /**
   * Disegna un checkpoint di un percorso a partire da un oggetto
   * google.maps.Marker esistente.
   * @function drawCheckpointFromObject
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {google.maps.Marker} pointObj - Oggetto marker da disegnare.
   */
  var drawCheckpointFromObject = function(map, pointObj){
    pointObj.setMap(map);
  };
  /**
   * Disegna un punto utente
   * @function drawCustomPoint
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * punto d'interesse nella mappa.
   */
  var drawCustomPoint = function(map){
    return drawMarker(map, map.getCenter(), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      strokeColor: 'red',
      strokeOpacity: 0.7,
      scale: 3
    }, true);
  };
  /**
   * Disegna un punto utente a partire da una coppia di coordinate
   * @function drawCustomPointFromPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Number} lat - Latitudine del punto utente.
   * @param {Number} lng - Longitudine del punto utente.
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * punto d'interesse nella mappa.
   */
  var drawCustomPointFromPosition = function(map, lat, lng){
    return drawMarker(map, new google.maps.LatLng(lat, lng), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      strokeColor: 'red',
      strokeOpacity: 0.7,
      scale: 3
    }, false);
  };
  /**
   * Disegna un punto utente a partire da una coppia di coordinate, con la
   * possibilità di modificarne la posizione
   * @function drawEditableCustomPointFromPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Number} lat - Latitudine del punto utente.
   * @param {Number} lng - Longitudine del punto utente.
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * punto d'interesse nella mappa.
   */
  var drawEditableCustomPointFromPosition = function(map, lat, lng){
    return drawMarker(map, new google.maps.LatLng(lat, lng), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      strokeColor: 'red',
      strokeOpacity: 0.7,
      scale: 3
    }, true);
  };
  /**
   * Ottiene la posizione di un marker generico.
   * @function getMarkerPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Marker} marker - Oggetto marker di cui ottenere le
   * dimensioni.
   * @returns {Object} - Oggetto che contiene un attributo "lat" con la
   * latitudine e un attributo "lng" con la longitudine.
   */
  var getMarkerPosition = function(marker){
    var p = marker.getPosition();
    return {
      lat: p.lat(),
      lng: p.lng()
    };
  };
  /**
   * Ottiene la posizione di un checkpoint.
   * @function getCheckpointPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Marker} checkpoint - Oggetto marker che rappresenta il
   * checkpoint di cui ottenere la posizione.
   * @returns {Object} - Oggetto che contiene un attributo "lat" con la
   * latitudine e un attributo "lng" con la longitudine.
   */
  var getCheckpointPosition = function(checkpoint){
    return getMarkerPosition(checkpoint);
  };
  /**
   * Ottiene la posizione di un punto utente.
   * @function getCustomPointPosition
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Marker} customPoint - Oggetto marker che rappresenta il
   * punto utente di cui ottenere la posizione.
   * @returns {Object} - Oggetto che contiene un attributo "lat" con la
   * latitudine e un attributo "lng" con la longitudine.
   */
  var getCustomPointPosition = function(customPoint){
    return getMarkerPosition(customPoint);
  };
  /**
   * Disegna un percorso.
   * @function drawTrack
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Map} map - Oggetto mappa di Google Maps.
   * @param {Array} points - Array di oggetti che contengono un attributo "lat"
   * con la latitudine e un attributo "lng" con la longitudine.
   * @returns {google.maps.Polyline} - Oggetto rappresentante il percorso
   * disegnato.
   */
  var drawTrack = function(map, points){
    var latlngs = [];
    points.forEach(function(p){
      latlngs.push(new google.maps.LatLng(p.lat, p.lng));
    });
    return drawLine(map, points, 'yellow', 0.7, null);
  };
  /**
   * Rimuove un generico componente dalla mappa.
   * @function removeComponentFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.MVCObject} component - Oggetto che rappresenta il
   * componente da rimuovere.
   */
  var removeComponentFromMap = function (component){
    component.setMap(null);
  };
  /**
   * Rimuove una linea dalla mappa.
   * @function removeLineFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Polyline} line - Oggetto che rappresenta la
   * linea da rimuovere.
   */
  var removeLineFromMap = function(line){
    removeComponentFromMap(line);
  };
  /**
   * Rimuove un percorso dalla mappa.
   * @function removeTrackFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Polyline} track - Oggetto che rappresenta il percorso
   * da rimuovere.
   */
  var removeTrackFromMap = function(track){
    removeLineFromMap(track);
  };
  /**
   * Rimuove un marker dalla mappa.
   * @function removeMarkerFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Marker} marker - Oggetto che rappresenta il
   * marker da rimuovere.
   */
  var removeMarkerFromMap = function(marker){
    removeComponentFromMap(marker);
  };
  /**
   * Rimuove un checkpoint dalla mappa.
   * @function removeCheckpointFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Marker} point - Oggetto che rappresenta il checkpoint
   * da rimuovere.
   */
  var removeCheckpointFromMap = function(point){
    removeMarkerFromMap(point);
  };
  /**
   * Rimuove un punto d'interesse dalla mappa.
   * @function removePOIFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Marker} point - Oggetto che rappresenta il punto
   * d'interesse da rimuovere.
   */
  var removePOIFromMap = function(point){
    removeMarkerFromMap(point);
  };
  /**
   * Rimuove un punto utente dalla mappa.
   * @function removeCustomPointFromMap
   * @memberOf Map.GoogleMapsService
   * @instance
   * @param {google.maps.Marker} point - Oggetto che rappresenta il punto
   * utente da rimuovere.
   */
  var removeCustomPointFromMap = function(point){
    removeMarkerFromMap(point);
  };

  return {
    initMap: initMap,
    initMapFromPerimeter: initMapFromPerimeter,
    drawPerimeter: drawPerimeter,
    drawPerimeterFromBounds: drawPerimeterFromBounds,
    closePerimeter: closePerimeter,
    enablePerimeterEditing: enablePerimeterEditing,
    drawPath: drawPath,
    drawPOI: drawPOI,
    drawCheckpoint: drawCheckpoint,
    drawCheckpointFromPosition: drawCheckpointFromPosition,
    createEditableCheckpointFromPosition: createEditableCheckpointFromPosition,
    drawCheckpointFromObject: drawCheckpointFromObject,
    drawCustomPoint: drawCustomPoint,
    drawCustomPointFromPosition: drawCustomPointFromPosition,
    drawEditableCustomPointFromPosition: drawEditableCustomPointFromPosition,
    getCheckpointPosition: getCheckpointPosition,
    getCustomPointPosition: getCustomPointPosition,
    drawTrack: drawTrack,
    removeTrackFromMap: removeTrackFromMap,
    removeCheckpointFromMap: removeCheckpointFromMap,
    removePOIFromMap: removePOIFromMap,
    removeCustomPointFromMap: removeCustomPointFromMap
  };
}
