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
   * Name: TelemetryController
   * Package: Telemetry
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa controller secondo DP
   *
   */

angular.module('telemetry').controller('TelemetryController',
				       TelemetryController);

/**
  * Classe che gestisce la visualizzazione di un tracciamento di una determinata
  * esperienza. Nel costruttore recupera, attraverso i parametri presenti nella
  * querystring e ottenuti via $routeParams, i dati relativi ai vari
  * tracciamenti.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @memberOf Telemetry
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} ExperienceService - Servizio di comunicazione con il
  * backend per la gestione delle esperienze.
  * @param {Service} TelemetryService - Servizio di comunicazione con il
  * backend per la gestione dei tracciamenti.
  * @param {Service} $routeParams - Servizio di AngularJS per ottenere parametri
  * relativi alla route che ha attivato il controller.
  */

function TelemetryController($scope, ExperienceService, TelemetryService,
  $routeParams) {
  /**
   * Codice identificativo dell'esperienza.
   *
   * @name experienceId
   * @type Number
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.experienceId = $routeParams.experienceId;
  /**
   * Codice identificativo del percorso.
   *
   * @name trackId
   * @type Number
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.trackId = $routeParams.trackId;
  /**
   * Nome dell'esperienza di cui si stanno visualizzando i tracciamenti.
   *
   * @name expName
   * @type String
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.expName = "";
  /**
   * Nome del percorso di cui si stanno visualizzando i tracciamenti.
   *
   * @name trackpName
   * @type String
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.trackName = "";
  /**
   * Array di tracciamenti caricati, relativi all'esperienza e al percorso
   * selezionati.
   *
   * @name telemetries
   * @type Array
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.telemetries = [];
  /**
   * Indice dell'esperienza di cui si stanno attualmente visualizzando i
   * dettagli.
   *
   * @name currentTelemetryIndex
   * @type Number
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.currentTelemetryIndex = -1;
  /**
   * Array di informazioni relative al tracciamento che si sta attualmente
   * visualizzando.
   *
   * @name currentTelemetry
   * @type Array
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.currentTelemetry = [];
  /**
   * Impostazioni riguardanti il grafico generato da Angular Charts.
   *
   * @name heartChartOptions
   * @type Object
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.heartChartOptions = {
    rows: [{
      key: 'heart',
      type: 'line',
      name: 'Battito cardiaco'
    }],
    xAxis: {
      key: 'id',
      displayFormat: function(x){
        return "Checkpoint #" + x;
      }
    },
  };

  ExperienceService.getExperienceDetails($scope.experienceId, function(ok, exp){
    if(ok){
      $scope.expName = exp.name;
      exp.tracks.forEach(function(t){
        if(t.id == $scope.trackId){
          $scope.trackName = t.name;
          return;
        }
      });
    }
  });

  TelemetryService.getTelemetryList($scope.experienceId, $scope.trackId,
    function(ok, data){

      if(ok){
        $scope.telemetries = data;
      }
  });
  /**
   * Funzione invocata dalla lista per visualizzare i dettagli relativi a un
   * particolare tracciamento.
   *
   * @function showTelemetry
   * @memberOf Telemetry.TelemetryController
   * @instance
   */
  $scope.showTelemetry = function(index){
    if (typeof $scope.telemetries[index].data == 'undefined'){
      TelemetryService.getTelemetryDetails($scope.experienceId, $scope.trackId,
        index, function(ok, data){
          if(ok){
            $scope.telemetries[index].data = data;
            $scope.currentTelemetry = $scope.telemetries[index].data;
            $scope.currentTelemetryIndex = index;
          }
        });
    } else {
      $scope.currentTelemetry = $scope.telemetries[index].data;
      $scope.currentTelemetryIndex = index;
    }
  };
}
