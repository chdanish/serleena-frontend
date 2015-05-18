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
   * Name: ExperienceWizardController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   *
   */

angular.module('experience').controller('ExperienceWizardController',
					ExperienceWizardController);
/**
  * Classe che gestisce la procedura guidata di creazione e modifica di
  * un’esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Provider} Map - Provider che fornisce l'instanza del gestore della
  * mappa.
  * @param {Service} SerleenaDataService - Servizio per ottenere dati geografici
  * dal database del backend.
  * @param {Service} ExperienceService - Servizio per comunicare al backend
  * operazioni da svolgere relativamente alla gestione delle esperienze.
  */


function ExperienceWizardController($scope, Map, SerleenaDataService,
    ExperienceService) {
  /**
   * Flag per la visualizzazione del wizard.
   *
   * @name showWizard
   * @type Boolean
   * @default true
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.showWizard = true;
  /**
   * Nome dell'esperienza
   *
   * @name expName
   * @type String
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.expName = "";
  /**
   * Id del tag html di MapDirective
   *
   * @name mapTagId
   * @type String
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.mapTagId = "";
  /**
   * Flag per la visualizzazione delle informazioni relativi ai percorsi.
   *
   * @name showTracks
   * @type Boolean
   * @default false
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.showTracks = false;
  /**
   * Flag per la visualizzazione delle informazioni relative alla selezione dei
   * punti d'interesse.
   *
   * @name showPOISelection
   * @type Boolean
   * @default false
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.showPOISelection = false;
  /**
   * Flag per la visualizzazione delle informazioni relative alla selezione dei
   * punti utente.
   *
   * @name showCustomPointSelection
   * @type Boolean
   * @default false
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.showCustomPointSelection = false;
  /**
   * Array di percorsi
   *
   * @name tracks
   * @type Array
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.tracks = [];
  /**
   * Indice del percorso corrente
   *
   * @name currentTrackIndex
   * @type Number
   * @memberOf ExperienceWizardController
   * @instance
   * @default -1
   */
  $scope.currentTrackIndex = -1;
  /**
   * Indice del precedente percorso selezionato.
   *
   * @name previousTrackIndex
   * @type Number
   * @memberOf ExperienceWizardController
   * @instance
   * @default -1
   */
  $scope.previousTrackIndex = -1;
  /**
   * Array di punti d'interesse
   *
   * @name poi
   * @type Array
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.poi = [];
  /**
   * Array di punti utente
   *
   * @name customPoints
   * @type Array
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.customPoints = [];
  /**
   * Gestisce l'evento hhMapLink lanciato da MapDirective, in modo da poter
   * ottenere l'Id di quest'ultima.
   *
   * @function linkMap
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   * @param {Object} event - Evento che è stato lanciato (hhMapLink)
   * @param {String} elementId - Id del tag html di MapDirective.
   */
  var linkMap = function(event, elementId) {
    $scope.mapTagId = elementId;
  };
  /**
   * Funzione da eseguire dopo il completamento dello step di inserimento del
   * nome esperienza. Essa visualizza la mappa e disegna il rettangolo con cui
   * selezionare il perimetro.
   *
   * @function afterInsertName
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   */
  var afterInsertName= function(){
    $scope.showMap = true;
    $scope.map = Map.initMap($scope.mapTagId);
    $scope.rectangle = Map.drawPerimeter($scope.map);
  };
  /**
   * Funzione da eseguire dopo il completamento dello step di definizione del
   * perimetro esperienza. Essa finalizza il perimetro e disegna i sentieri
   * caricati dal backend.
   *
   * @function afterPerimeterChoose
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   */
  var afterPerimeterChoose = function(){
    $scope.perimeter = Map.closePerimeter($scope.map, $scope.rectangle);
    SerleenaDataService.getPaths($scope.perimeter.ne, $scope.perimeter.sw,
      function(ok, paths){
        if(ok){
          paths.forEach(function(path){
            Map.drawPath($scope.map, path.name, path.points);
          });
        }
      });
    $scope.showTracks = true;
  };
  $scope.$on('hhMapLink', linkMap);
}
