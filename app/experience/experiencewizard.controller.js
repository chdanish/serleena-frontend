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
   * 0.0.2        Antonio Cavestro    Implementa creazione esperienza
   * 1.0.0        Antonio Cavestro    Implementa modifica esperienza
   *
   */

angular.module('experience').controller('ExperienceWizardController',
					ExperienceWizardController);
/**
  * Classe che gestisce la procedura guidata di creazione e modifica di
  * un’esperienza. Nel costruttore verifica se è stato invocato per modificare
  * un'esperienza, nel qual caso carica i dati dal backend con essi popola i
  * suoi attributi.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example L’applicativo è configurato tramite App::AppConfiguration per
  * invocare questo controller quando il browser richiede la pagina di creazione
  * e modifica di un’esperienza. Istanzia un oggetto mappa tramite un
  * riferimento a MapDirective e a MapProvider, ascolta gli eventi sul
  * cambiamento di step da parte di WizardDirective e in base a questi controlla
  * la mappa interagendo con l’utente e il MapProvider. Al termine del wizard
  * spedisce il risultato al backend tramite ExperienceService. Se la procedura
  * guidata è di modifica, carica i dati dell’esperienza da modificare tramite
  * l’ultimo servizio citato.
  * @constructor
  * @memberOf Experience
  * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
  * controller (il model) ed in cui vengono valutate le espressioni utilizzate
  * nella view.
  * @param {Provider} Map - Provider che fornisce l'instanza del gestore della
  * mappa.
  * @param {Service} SerleenaDataService - Servizio per ottenere dati geografici
  * dal database del backend.
  * @param {Service} ExperienceService - Servizio per comunicare al backend
  * operazioni da svolgere relativamente alla gestione delle esperienze.
  * @param {Service} $routeParams - Servizio di AngularJS per ottenere parametri
  * relativi alla route che ha attivato il controller.
  */


function ExperienceWizardController($scope, Map, SerleenaDataService,
    ExperienceService, $routeParams) {
  /**
   * Flag per la visualizzazione del wizard.
   *
   * @name showWizard
   * @type Boolean
   * @default true
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.showWizard = true;
  /**
   * Nome dell'esperienza
   *
   * @name expName
   * @type String
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.expName = "";
  $scope.nameForm = {};
  /**
   * Id del tag html di MapDirective
   *
   * @name mapTagId
   * @type String
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.mapTagId = "";
  /**
   * Flag per la visualizzazione della schermata di gestione del percorso.
   *
   * @name showEditPerimeter
   * @type Boolean
   * @default false
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.showEditPerimeter = false;
  /**
   * Flag per la visualizzazione delle informazioni relativi ai percorsi.
   *
   * @name showTracks
   * @type Boolean
   * @default false
   * @memberOf Experience.ExperienceWizardController
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
   * @memberOf Experience.ExperienceWizardController
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
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.showCustomPointSelection = false;
  /**
   * Array di percorsi
   *
   * @name tracks
   * @type Array
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.tracks = [];
  /**
   * Indice del percorso corrente
   *
   * @name currentTrackIndex
   * @type Number
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @default -1
   */
  $scope.currentTrackIndex = -1;
  /**
   * Indice del precedente percorso selezionato.
   *
   * @name previousTrackIndex
   * @type Number
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @default -1
   */
  $scope.previousTrackIndex = -1;
  /**
   * Array di punti d'interesse
   *
   * @name poi
   * @type Array
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.poi = [];
  /**
   * Array di punti utente
   *
   * @name customPoints
   * @type Array
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.customPoints = [];
  /**
   * Esito del salvataggio da passare alla vista.
   *
   * @name saveType
   * @type String
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.saveType = "";
  /**
   * Messaggio di conferma o errore del salvataggio esperienza.
   *
   * @name saveMsg
   * @type String
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.saveMsg = "";
  /**
   * Flag che stabilisce se il controller sta creando una nuova esperienza o se
   * ne sta modificando una esistente.
   *
   * @name editMode
   * @type Boolean
   * @default false
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.editMode = false;
  /**
   * Codice identificativo di un'esperienza da modificare.
   *
   * @name editExperienceId
   * @type Number
   * @default -1
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
   $scope.editExperienceId = -1;
   /**
   * Punti d'interesse relativi all'esperienza da modificare.
   *
   * @name editExperiencePoi
   * @type Array
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
   $scope.editExperiencePoi = [];
   /**
   * Punti utente relativi all'esperienza da modificare.
   *
   * @name editExperienceCustomPoints
   * @type Array
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
   $scope.editExperienceCustomPoints = [];

  if($routeParams.hasOwnProperty("experienceId")){
    $scope.editMode = true;
    $scope.editExperienceId = $routeParams.experienceId;
    ExperienceService.getExperienceDetails($scope.editExperienceId,
      function(ok, exp){
      if(ok){
        $scope.expName = $scope.nameForm.text = exp.name;
        exp.tracks.forEach(function(t){
          var track = {
            name: t.name,
            id: t.id
          };
          track.checkpoints = [];
          t.checkPoints.forEach( function (c) {
            track.checkpoints.push({lat: c.latitude, lng: c.longitude});
          });
          track.checkMarkers = [];
          ExperienceService.getTrackDetails(exp.id, t.id,
            function(ok, checkpoints){
              if (typeof checkpoints !== 'undefined'){
                checkpoints.forEach(function(c){
                  track.checkMarkers
                   .push(Map.createEditableCheckpointFromPosition(c.latitude,
                      c.longitude));
                });
              }
            $scope.tracks.push(track);
          });

        });
        $scope.perimeter = {
          ne: {
            lat: exp.boundingRect.topLeft.latitude,
            lng: exp.boundingRect.topLeft.longitude
          },
          sw: {
            lat: exp.boundingRect.bottomRight.latitude,
            lng: exp.boundingRect.bottomRight.longitude
          }
        };
        $scope.editExperiencePoi = [];
        exp.points_of_interest.forEach( function (p) {
          $scope.editExperiencePoi.push({
            name: p.name,
            type: p.type,
            lat: p.latitude,
            lng: p.longitude
          });
        });

        $scope.editExperienceCustomPoints = exp.user_points;
      }
    });
   }

  /**
   * Gestisce l'evento hhMapLink lanciato da MapDirective, in modo da poter
   * ottenere l'Id di quest'ultima.
   *
   * @function linkMap
   * @memberOf Experience.ExperienceWizardController
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
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   */
  var afterInsertName= function(){
    $scope.expName = $scope.nameForm.text;
    $scope.showMap = true;
    $scope.map = Map.initMap($scope.mapTagId);
    if ($scope.editMode){
      $scope.rectangle = Map.drawPerimeterFromBounds($scope.map,
        $scope.perimeter.ne, $scope.perimeter.sw);
    } else {
      $scope.rectangle = Map.drawPerimeter($scope.map);
    }
    $scope.showEditPerimeter = true;
  };
  /**
   * Funzione da eseguire dopo il completamento dello step di definizione del
   * perimetro esperienza. Essa finalizza il perimetro e disegna i sentieri
   * caricati dal backend.
   *
   * @function afterPerimeterChoose
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   */
  var afterPerimeterChoose = function(){
    $scope.showEditPerimeter = false;
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
  /**
   * Funzione che compara tue punti d'interesse e ne verifica l'uguaglianza.
   *
   * @function comparePOI
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Object} p1 - Primo punto da valutare.
   * @param {Object} p2 - Secondo punto da valutare.
   * @returns {Boolean} - true se sono uguali, altrimenti false.
   * @private
   */
  var comparePOI = function(p1, p2){
    return p1.name == p2.name;
  };
  /**
   * Funzione che, dato un array di punti d'interesse e un punto p, verifica se
   * p è un elemento dell'array.
   *
   * @function hasPOI
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Array} poiArray - Array di punti d'interesse.
   * @param {Object} p - Punto d'interesse.
   * @returns {Boolean} - true se p è contenuto in poiArray, altrimenti false.
   * @private
   */
  var hasPOI = function(poiArray, p){
    var result = false;
    poiArray.forEach(function(point){
      if(comparePOI(point, p)){
        result = true;
      }
    });
    return result;
  };
  /**
   * Funzione da eseguire dopo il completamento dello step di creazione dei
   * percorsi. Essa rimuove le informazioni sui percorsi dalla mappa, carica i
   * punti d'interesse compresi nel perimetro e li visualizza sulla mappa.
   *
   * @function afterTracksCreation
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   */
  var afterTracksCreation = function() {
    $scope.showTracks = false;
    $scope.showPOISelection = true;
    if($scope.previousTrackIndex != -1){
      if (typeof $scope.tracks[$scope.previousTrackIndex] !== 'undefined') {
        Map.removeTrackFromMap(
          $scope.tracks[$scope.previousTrackIndex].trackDraw
        );
      }
    }
    SerleenaDataService.getPOIs($scope.perimeter.ne, $scope.perimeter.sw, function(ok, poi){
      if(ok){
        $scope.poi = poi;
        $scope.poi.forEach(function(p){
          if($scope.editMode){
              p.selected = hasPOI($scope.editExperiencePoi, p);
          } else {
            p.selected = false;
          }
          p.marker = Map.drawPOI($scope.map, p.latitude, p.longitude, p.name);
        });
      }
    });
  };
  /**
   * Funzione da eseguire dopo il completamento dello step di selezione dei
   * punti d'interesse. Essa rimuove le informazioni sui punti dalla mappa, e
   * abilita la visualizzazione dell'interfaccia di creazione dei punti utente.
   *
   * @function afterPOISelection
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   */
  var afterPOISelection = function(){
    $scope.showPOISelection = false;
    $scope.poi.forEach(function(p){
      Map.removePOIFromMap(p.marker);
    });
    $scope.showCustomPointSelection = true;
    if ($scope.editMode){
      $scope.editExperienceCustomPoints.forEach(function(p){
        var o = {};
        o.marker = Map.
                  drawEditableCustomPointFromPosition($scope.map, p.latitude,
          p.longitude);
        $scope.customPoints.push(o);
      });
    }
  };
  /**
   * Funzione invocata dalla vista per disabilitare la modalità di modifica
   * esperienza a partire dal perimetro, cancellare eventuali dati precaricati
   * e continuare il wizard come se fosse in atto la creazione di una nuova
   * esperienza.
   *
   * @function disableEditMode
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.disableEditMode = function(){
    Map.enablePerimeterEditing($scope.rectangle);
    $scope.tracks = [];
    $scope.editMode = false;
  };
  /**
   * Funzione invocata dalla vista per aggiungere un nuovo percorso all'array
   * dedicato.
   *
   * @function addNewTrack
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.addNewTrack = function(){
    $scope.tracks.push({
      name: "Nuovo percorso",
      showRename: true,
      checkMarkers: [],
      checkpoints: [],
    });
  };
  /**
   * Funzione invocata dalla vista per abilitare la visualizzazione
   * dell'interfaccia per rinominare un percorso.
   *
   * @function showTrackRename
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del percorso a cui abilitare il cambio
   * del nome.
   */
  $scope.showTrackRename = function(index){
    $scope.tracks[index].showRename = true;
  };
  /**
   * Funzione invocata dalla vista per disabilitare la visualizzazione
   * dell'interfaccia per rinominare un percorso.
   *
   * @function closeTrackRename
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del percorso a cui disabilitare il cambio
   * del nome.
   */
  $scope.closeTrackRename = function(index){
    $scope.tracks[index].showRename = false;
  };
  /**
   * Funzione invocata dalla vista per abilitare la gestione dei checkpoint
   * relativi a un percorso, impostando quest'ultimo come percorso corrente.
   *
   * @function editTrack
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del percorso di cui gestire i checkpoint.
   */
  $scope.editTrack = function(index){
    $scope.currentTrackIndex = index;
    if($scope.previousTrackIndex != -1 || $scope.editMode){
      if (!$scope.editMode){
        Map.
        removeTrackFromMap($scope.tracks[$scope.previousTrackIndex].trackDraw);
      }
      $scope.tracks[$scope.currentTrackIndex].checkMarkers.forEach(function(m){
        Map.drawCheckpointFromObject($scope.map, m);
      });
    }
  };
  /**
   * Funzione invocata dalla vista per eliminare un percorso dall'array
   * dedicato.
   *
   * @function deleteTrack
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del percorso da eliminare.
   */
  $scope.deleteTrack = function(index){
    if($scope.previousTrackIndex == index){
      Map.
      removeTrackFromMap($scope.tracks[$scope.previousTrackIndex].trackDraw);
    }
    $scope.tracks.splice(index, 1);
    if(index < $scope.previousTrackIndex){
      $scope.previousTrackIndex--;
    }
  };
  /**
   * Funzione invocata dalla vista per aggiungere un nuovo checkpoint al
   * percorso corrente.
   *
   * @function addNewCheckpoint
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.addNewCheckpoint = function(){
    var c = Map.drawCheckpoint($scope.map);
    $scope.tracks[$scope.currentTrackIndex].checkMarkers
        .push(c);
  };
  /**
   * Funzione invocata dalla vista per cancellare uno specifico checkpoint dal
   * percorso corrente.
   *
   * @function deleteCheckpoint
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del checkpoint da eliminare.
   */
  $scope.deleteCheckpoint = function(index){
    Map.removeCheckpointFromMap($scope.tracks[$scope.currentTrackIndex]
      .checkMarkers[index]);
    $scope.tracks[$scope.currentTrackIndex].checkMarkers.splice(index, 1);
  };
  /**
   * Funzione invocata dalla vista per salvare i checkpoint del percorso
   * corrente ed uscire dalla gestione di quest'ultimo.
   *
   * @function saveCheckpoints
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.saveCheckpoints = function(){
    var oldCheckpoints = $scope.tracks[$scope.currentTrackIndex].checkpoints;
    $scope.tracks[$scope.currentTrackIndex].checkpoints = [];
    $scope.tracks[$scope.currentTrackIndex].checkMarkers.forEach(function(m){
      $scope.tracks[$scope.currentTrackIndex].checkpoints
                                            .push(Map.getCheckpointPosition(m));
      Map.removeCheckpointFromMap(m);
    });

    $scope.tracks[$scope.currentTrackIndex].trackDraw = Map
                                                        .drawTrack($scope.map,
      $scope.tracks[$scope.currentTrackIndex].checkpoints);

    if ($scope.editMode){
      var newCheckpoints = $scope.tracks[$scope.currentTrackIndex].checkpoints;
      var edited = false;
      if (oldCheckpoints.length !== newCheckpoints.length) {
        edited = true;
      } else {
        for (var i = 0; i < oldCheckpoints.length && !edited; i++) {
          if (oldCheckpoints[i].lat !== newCheckpoints[i].lat ||
                oldCheckpoints[i].lng !== newCheckpoints[i].lng) {
            edited = true;
          }
        }
      }
      if (edited) {
        delete $scope.tracks[$scope.currentTrackIndex].id;
      }
    }

    $scope.previousTrackIndex = $scope.currentTrackIndex;
    $scope.currentTrackIndex = -1;
  };
  /**
   * Funzione invocata dalla vista per aggiungere un nuovo punto utente
   *
   * @function addNewCustomPoint
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  $scope.addNewCustomPoint = function(){
    $scope.customPoints.push({
      marker: Map.drawCustomPoint($scope.map)
    });
  };
  /**
   * Funzione invocata dalla vista per cancellare uno specifico punto utente.
   *
   * @function deleteCustomPoint
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del punto utente da eliminare.
   */
  $scope.deleteCustomPoint = function(index){
    Map.removeCustomPointFromMap($scope.customPoints[index].marker);
    $scope.customPoints.splice(index, 1);
  };
  /**
   * Array di funzioni da eseguire al passaggio di ogni step.
   *
   * @name steps
   * @type Array
   * @private
   * @memberOf Experience.ExperienceWizardController
   * @instance
   */
  var steps = [
    afterInsertName,
    afterPerimeterChoose,
    afterTracksCreation,
    afterPOISelection
  ];
  /**
   * Funzione invocata al passaggio a uno step successivo, ossia in risposta
   * all'evento "hhWizardNextStep".
   *
   * @function onWizardNextStep
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   * @param {Object} event - Evento che provoca l'invocazione della funzione
   * (hhWizardNextStep).
   * @param {Number} step - Indice dello step successivo.
   */
  var onWizardNextStep = function(event, step){
    steps[step-1]();
  };
  /**
   * Funzione invocata alla fine del wizard, ossia in risposta all'evento
   * "hhWizardCompleted". Si occupa di salvare l'esperienza tramite chiamata a
   * ExperienceService.
   *
   * @function onWizardCompleted
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   */
  var onWizardCompleted = function(){
    var from = {
        latitude: $scope.perimeter.ne.lat,
        longitude: $scope.perimeter.sw.lng
    };
    var to = {
        latitude: $scope.perimeter.sw.lat,
        longitude: $scope.perimeter.ne.lng
    };
    var cleanTracks = [];
    $scope.tracks.forEach(function(t){
      var checkpoints = [];
      for (var i = 0; i < t.checkpoints.length; i++) {
        checkpoints.push({
          id: i,
          latitude: t.checkpoints[i].lat,
          longitude: t.checkpoints[i].lng
        });
      }
      cleanTracks.push({
        id: t.id,
        name: t.name,
        checkPoints: checkpoints
      });
    });
    var selectedPOIs = [];
    $scope.poi.forEach(function(p){
      if(p.selected){
        selectedPOIs.push({
          name: p.name,
          latitude: p.latitude,
          longitude: p.longitude
        });
      }
    });
    var selectedCustomPoints = [];
    $scope.customPoints.forEach(function(p){
      var c = Map.getCustomPointPosition(p.marker);
      selectedCustomPoints.push({
        latitude: c.lat,
        longitude: c.lng
      });
    });

    if($scope.editMode){
      var fromLat = from.latitude;
      from.latitude = to.latitude;
      to.latitude = fromLat;
      ExperienceService.editExperience($scope.editExperienceId, $scope.expName,
        cleanTracks, from, to, selectedPOIs, selectedCustomPoints,
        experienceSavingCallback);
    } else {
      ExperienceService.saveExperience($scope.expName, cleanTracks, from, to,
      selectedPOIs, selectedCustomPoints, experienceSavingCallback);
    }
  };
  /**
   * Funzione che gestisce la risposta dal server alla creazione e alla modifica
   * di un'esperienza.
   *
   * @function experienceSavingCallback
   * @memberOf Experience.ExperienceWizardController
   * @instance
   * @private
   */
  var experienceSavingCallback = function(ok, data){
    $scope.showWizard = false;

      if(ok){
        $scope.saveType = "success";
        $scope.saveMsg = "Esperienza salvata con successo!";
      } else {
        $scope.saveType = "danger";
        $scope.saveMsg = "Errore nel salvataggio dell'esperienza :(";
      }
  };

  $scope.$on('hhMapLink', linkMap);
  $scope.$on('hhWizardNextStep', onWizardNextStep);
  $scope.$on('hhWizardCompleted', onWizardCompleted);
}
