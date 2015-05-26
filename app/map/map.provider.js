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
