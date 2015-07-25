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
   * Name: SerleenaDataService
   * Package: Map
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 1.0.0        Matteo Lisotto       Create file
   *
   */

angular.module('map').service('SerleenaDataService', SerleenaDataService);

/**
  * Classe singleton che implementa la comunicazione con il backend per
  * interrogare la base dati su informazioni geografiche (sentieri e punti
  * d’interesse).
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Viene usato da Experience.ExperienceWizardController per ottenere
  * informazioni geografiche da disegnare sulla mappa tramite MapProvider.
  * @constructor
  * @memberOf Map
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function SerleenaDataService($http, BACKEND_URL) {
  /**
   * Metodo per ottenere la lista dei sentieri in un determinato perimetro.
   *
   * @function getPaths
   * @memberOf Map.SerleenaDataService
   * @instance
   * @param {Object} from - oggetto che rappresenta il punto a nord-est
   * dell'area di cui si vuole conoscere i sentieri, con un attributo "lat" per
   * la latitudine e un attributo "lng" per la longitudine.
   * @param {Object} to - oggetto che rappresenta il punto a sud-ovest
   * dell'area di cui si vuole conoscere i sentieri, con un attributo "lat" per
   * la latitudine e un attributo "lng" per la longitudine.
   * @param {function} callback - funzione da invocare alla ricezione della
   * risposta dal backend e a cui passare i dati ricevuti.
   */
  var getPaths = function(from, to, callback){
    $http({
      url: BACKEND_URL + "/paths/" + from.lat + ";" + from.lng + "/" + to.lat +
                                                                  ";" + to.lng,
      method: 'GET'
    }).success(function(data){
      callback(true, data.paths);
    }).error(function(data){
      callback(false, data);
    });
  };
  /**
   * Metodo per ottenere la lista dei punti d'interesse in un determinato
   * perimetro.
   *
   * @function getPOIs
   * @memberOf Map.SerleenaDataService
   * @instance
   * @param {Object} from - oggetto che rappresenta il punto a nord-est
   * dell'area di cui si vuole conoscere i punti d'interesse, con un attributo
   * "lat" per la latitudine e un attributo "lng" per la longitudine.
   * @param {Object} to - oggetto che rappresenta il punto a sud-ovest
   * dell'area di cui si vuole conoscere i punti d'interesse, con un attributo
   * "lat" per la latitudine e un attributo "lng" per la longitudine.
   * @param {function} callback - funzione da invocare alla ricezione della
   * risposta dal backend e a cui passare i dati ricevuti.
   */
  var getPOIs = function(from, to, callback){
    $http({
      url: BACKEND_URL + "/poi/" + from.lat + "," + from.lng + "/" + to.lat +
                                                                  "," + to.lng,
      method: 'GET'
    }).success(function(data){
      callback(true, data);
    }).error(function(data){
      callback(false, data);
    });
  };

  /**
   * Trasforma le coordinate di un perimetro in un formato comprensibile dal
   * servizio di backend.
   *
   * @function formatLatLngForBackend
   * @memberOf Map.SerleenaDataService
   * @param {Object} ne - oggetto che rappresenta il punto a nord-est
   * dell'area, con un attributo "lat" per la latitudine e un attributo "lng"
   * per la longitudine.
   * @param {Object} sw - oggetto che rappresenta il punto a sud-ovest
   * dell'area, con un attributo "lat" per la latitudine e un attributo "lng"
   * per la longitudine.
   * @instance
   * @private
   */
  var formatLatLngForBackend = function(ne, sw){
    var nw = {
      lat: (parseFloat(ne.lat).toFixed(1))+1,
      lng: (parseFloat(sw.lng).toFixed(2))-1
    };

    var se = {
      lat: (parseFloat(sw.lat).toFixed(2))-1,
      lng: (parseFloat(ne.lng).toFixed(1))+1
    };
    return {
      nw: nw,
      se: se
    };
  };

  return {
    getPaths: getPaths,
    getPOIs: getPOIs
  };
}
