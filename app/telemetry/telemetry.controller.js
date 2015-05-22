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
   *
   */

angular.module('telemetry').controller('TelemetryController',
				       TelemetryController);

/**
  * Classe che gestisce la visualizzazione di un tracciamento di una determinata
  * esperienza.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
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
   * @memberOf TelemetryController
   * @instance
   */
  $scope.experienceId = $routeParams.experienceId;
  /**
   * Codice identificativo del percorso.
   *
   * @name trackId
   * @type Number
   * @memberOf TelemetryController
   * @instance
   */
  $scope.trackId = $routeParams.trackId;
  /**
   * Nome dell'esperienza di cui si stanno visualizzando i tracciamenti.
   *
   * @name expName
   * @type String
   * @memberOf TelemetryController
   * @instance
   */
  $scope.expName = "";
  /**
   * Nome del percorso di cui si stanno visualizzando i tracciamenti.
   *
   * @name trackpName
   * @type String
   * @memberOf TelemetryController
   * @instance
   */
  $scope.trackName = "";
  /**
   * Array di tracciamenti caricati, relativi all'esperienza e al percorso
   * selezionati.
   *
   * @name telemetries
   * @type Array
   * @memberOf TelemetryController
   * @instance
   */
  $scope.telemetries = [];
  /**
   * Indice dell'esperienza di cui si stanno attualmente visualizzando i
   * dettagli.
   *
   * @name currentTelemetryIndex
   * @type Number
   * @memberOf TelemetryController
   * @instance
   */
  $scope.currentTelemetryIndex = -1;
  /**
   * Array di informazioni relative al tracciamento che si sta attualmente
   * visualizzando.
   *
   * @name currentTelemetry
   * @type Array
   * @memberOf TelemetryController
   * @instance
   */
  $scope.currentTelemetry = [];
  /**
   * Impostazioni riguardanti il grafico generato da Angular Charts.
   *
   * @name heartChartOptions
   * @type Object
   * @memberOf TelemetryController
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
}
