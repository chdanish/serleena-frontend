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
  * un’esperienza. Nel costruttore verifica se è stato invocato per modificare
  * un'esperienza, nel qual caso carica i dati dal backend con essi popola i
  * suoi attributi.
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
   * Flag per la visualizzazione della schermata di gestione del percorso.
   *
   * @name showEditPerimeter
   * @type Boolean
   * @default false
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.showEditPerimeter = false;
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
   * Esito del salvataggio da passare alla vista.
   *
   * @name saveType
   * @type String
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.saveType = "";
  /**
   * Messaggio di conferma o errore del salvataggio esperienza.
   *
   * @name saveMsg
   * @type String
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
   * @instance
   */
  $scope.editMode = false;
  /**
   * Codice identificativo di un'esperienza da modificare.
   *
   * @name editExperienceId
   * @type Number
   * @default -1
   * @memberOf ExperienceWizardController
   * @instance
   */
   $scope.editExperienceId = -1;
   /**
   * Punti d'interesse relativi all'esperienza da modificare.
   *
   * @name editExperiencePoi
   * @type Array
   * @memberOf ExperienceWizardController
   * @instance
   */
   $scope.editExperiencePoi = [];
   /**
   * Punti utente relativi all'esperienza da modificare.
   *
   * @name editExperienceCustomPoints
   * @type Array
   * @memberOf ExperienceWizardController
   * @instance
   */
   $scope.editExperienceCustomPoints = [];

  if($routeParams.hasOwnProperty("experienceId")){
    $scope.editMode = true;
    $scope.editExperienceId = $routeParams.experienceId;
    ExperienceService.getExperienceDetails($scope.editExperienceId, function(ok, exp){
      if(ok){
        $scope.expName = exp.name;
        exp.tracks.forEach(function(t){
          t.checkMarkers = [];
          ExperienceService.getTrackDetails(exp.id, t.id, function(ok, checkpoints){
            checkpoints.forEach(function(c){
              t.checkMarkers.push(Map.createEditableCheckpointFromPosition(c.lat, c.lng));
            });
            $scope.tracks.push(t);
          });
        });
        $scope.perimeter = exp.perimeter;
        $scope.editExperiencePoi = exp.poi;
        $scope.editExperienceCustomPoints = exp.userpoints;
      }
    });
   }

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
   * @memberOf ExperienceWizardController
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
   * Funzione da eseguire dopo il completamento dello step di creazione dei
   * percorsi. Essa rimuove le informazioni sui percorsi dalla mappa, carica i
   * punti d'interesse compresi nel perimetro e li visualizza sulla mappa.
   *
   * @function afterTracksCreation
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   */
  var afterTracksCreation = function() {
    $scope.showTracks = false;
    $scope.showPOISelection = true;
    if($scope.previousTrackIndex != -1){
      Map.removeTrackFromMap($scope.tracks[$scope.previousTrackIndex].trackDraw);
    }
    var poiFrom = $scope.perimeter.ne.lat + ";" + $scope.perimeter.ne.lng;
    var poiTo = $scope.perimeter.sw.lat + ";" + $scope.perimeter.sw.lng;
    SerleenaDataService.getPOIs(poiFrom, poiTo, function(ok, poi){
      if(ok){
        $scope.poi = poi;
        $scope.poi.forEach(function(p){
          p.selected = false;
          p.marker = Map.drawPOI($scope.map, p.lat, p.lng, p.name);
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
   * @memberOf ExperienceWizardController
   * @instance
   * @private
   */
  var afterPOISelection = function(){
    $scope.showPOISelection = false;
    $scope.poi.forEach(function(p){
      Map.removePOIFromMap(p.marker);
    });
    $scope.showCustomPointSelection = true;
  };
  /**
   * Funzione invocata dalla vista per aggiungere un nuovo percorso all'array
   * dedicato.
   *
   * @function addNewTrack
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del percorso di cui gestire i checkpoint.
   */
  $scope.editTrack = function(index){
    $scope.currentTrackIndex = index;
    if($scope.previousTrackIndex != -1){
      Map.removeTrackFromMap($scope.tracks[$scope.previousTrackIndex].trackDraw);
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
   * @memberOf ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del percorso da eliminare.
   */
  $scope.deleteTrack = function(index){
    if($scope.previousTrackIndex == index){
      Map.removeTrackFromMap($scope.tracks[$scope.previousTrackIndex].trackDraw);
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
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
   * @instance
   * @param {Number} index - Indice del checkpoint da eliminare.
   */
  $scope.saveCheckpoints = function(){
    $scope.tracks[$scope.currentTrackIndex].checkpoints = [];
    $scope.tracks[$scope.currentTrackIndex].checkMarkers.forEach(function(m){
      $scope.tracks[$scope.currentTrackIndex].checkpoints.push(Map.getCheckpointPosition(m));
      Map.removeCheckpointFromMap(m);
    });

    $scope.tracks[$scope.currentTrackIndex].trackDraw = Map.drawTrack($scope.map,
      $scope.tracks[$scope.currentTrackIndex].checkpoints);
    $scope.previousTrackIndex = $scope.currentTrackIndex;
    $scope.currentTrackIndex = -1;
  };
  /**
   * Funzione invocata dalla vista per aggiungere un nuovo punto utente
   *
   * @function addNewCustomPoint
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
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
   * @memberOf ExperienceWizardController
   * @instance
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
   * @memberOf ExperienceWizardController
   * @instance
   */
  var onWizardCompleted = function(){
    var from = $scope.perimeter.ne.lat + ";" + $scope.perimeter.ne.lng;
    var to = $scope.perimeter.sw.lat + ";" + $scope.perimeter.sw.lng;
    var cleanTracks = [];
    $scope.tracks.forEach(function(t){
      cleanTracks.push({
        name: t.name,
        checkpoints: t.checkpoints
      });
    });
    var selectedPOIs = [];
    $scope.poi.forEach(function(p){
      if(p.selected){
        selectedPOIs.push(p.id);
      }
    });
    var selectedCustomPoints = [];
    $scope.customPoints.forEach(function(p){
      selectedCustomPoints.push(Map.getCustomPointPosition(p.marker));
    });

    ExperienceService.saveExperience($scope.name, cleanTracks, from, to,
      selectedPOIs, selectedCustomPoints, function(ok, data){

      $scope.showWizard = false;

      if(ok){
        $scope.saveType = "success";
        $scope.saveMsg = "Esperienza salvata con successo!";
      } else {
        $scope.saveType = "danger";
        $scope.saveMsg = "Errore nel salvataggio dell'esperienza :(";
      }
    });
  };

  $scope.$on('hhMapLink', linkMap);
  $scope.$on('hhWizardNextStep', onWizardNextStep);
  $scope.$on('hhWizardCompleted', onWizardCompleted);
}
