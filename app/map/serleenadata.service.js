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
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('map').service('SerleenaDataService', SerleenaDataService);

/**
  * Classe singleton che implementa la comunicazione con il backend per
  * interrogare la base dati su informazioni geografiche (sentieri e punti
  * d’interesse).
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @memberOf Map
  * @param {Provider} $http - Facade di AngularJS per la comunicazione via
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
      url: BACKEND_URL + "/poi/" + from.lat + ";" + from.lng + "/" + to.lat +
                                                                  ";" + to.lng,
      method: 'GET'
    }).success(function(data){
      callback(true, data.poi);
    }).error(function(data){
      callback(false, data);
    });
  };

  return {
    getPaths: getPaths,
    getPOIs: getPOIs
  };
}
