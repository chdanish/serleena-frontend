/**
  * Name: TelemetryControllerTest
  * Package: Telemetry
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per TelemetryController
  *
  */

describe('TelemetryController Test', function () {
    var $scope, experienceService, telemetryService, routeParams;
    var element = 0;
    var getTelemetryDetails = true;
    
    beforeEach(function () {
	angular.mock.module('angularChart');
	angular.mock.module('720kb.socialshare');
	module('telemetry');
    });

    beforeEach(inject(function($controller) {
	$scope = {};
	routeParams = {};
	routeParams.experienceId = 1;
	routeParams.trackId = 44;

	experienceService = jasmine.createSpyObj('Experienceservice',
						 ['getExperienceDetails']);
	experienceService.getExperienceDetails.and.callFake(
	    function (id, callback) {
		var exp;
		if (element == 0) {
		    experience = false;
		    exp = {
			name: 'Exp101',
			tracks: [{
			    id: 44,
			    name: 'Jupiter'
			}]
		    };
		    callback(true, exp);
		} else if (element == 1) {
		    getExperienceDetails = false;
		    exp = {
			name: 'Exp101',
			tracks: []
		    };
		    callback(true, exp);
		} else {
		    callback(false, exp);
		}
		element++;
	    });

	telemetryService = jasmine.createSpyObj('TelemetryService',
						['getTelemetryList',
						'getTelemetryDetails']);
	telemetryService.getTelemetryList.and.callFake(
	    function(id, track, callback) {
		var data = [88, 42];
		if (element == 4) {
		    callback(true, data);
		} else {
		    callback(false, data);
		}
	    });

	telemetryService.getTelemetryDetails.and.callFake(
	    function(id, trackId, index, callback) {
		var data = 'Run to the hill';
		if (getTelemetryDetails) {
		    getTelemetryDetails = false;
		    callback(true, data);
		} else if (getExperienceDetails) {
		    callback(false, data);
		}
	    });

	$controller ('TelemetryController', {
	    $scope: $scope,
	    ExperienceService: experienceService,
	    TelemetryService: telemetryService,
	    $routeParams: routeParams
	});
    }));

    it('TelemetryController with expName and trackName', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('Exp101');
	expect($scope.trackName).toBe('Jupiter');
	expect($scope.telemetries).toEqual([]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');
    });

    it('TelemetryController with expName', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('Exp101');
	expect($scope.trackName).toBe('');
	expect($scope.telemetries).toEqual([]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');
     });

    it('TelemetryController', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('');
	expect($scope.trackName).toBe('');
	expect($scope.telemetries).toEqual([]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');
    });

    it('TelemetryController whith getTelemetryList', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('');
	expect($scope.trackName).toBe('');
	expect($scope.telemetries).toEqual([88, 42]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');
    });

    it('Successfully showTelemetry undefined', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('');
	expect($scope.trackName).toBe('');
	expect($scope.telemetries).toEqual([]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');

	$scope.telemetries[0] = {};
	$scope.showTelemetry(0);

	expect($scope.telemetries[0].data).toBe('Run to the hill');
	expect($scope.currentTelemetry).toBe('Run to the hill');
	expect($scope.currentTelemetryIndex).toBe(0);
    });

    it('Successfully showTelemetry undefined failed', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('');
	expect($scope.trackName).toBe('');
	expect($scope.telemetries).toEqual([]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');

	$scope.telemetries[0] = {};
	$scope.showTelemetry(0);

	expect($scope.telemetries[0].data).toBe();
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.currentTelemetryIndex).toEqual(-1);
    });

    it('Successfully showTelemetry not undefined', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.trackId).toBe(44);
	expect($scope.expName).toBe('');
	expect($scope.trackName).toBe('');
	expect($scope.telemetries).toEqual([]);
	expect($scope.currentTelemetryIndex).toBe(-1);
	expect($scope.currentTelemetry).toEqual([]);
	expect($scope.heartChartOptions.rows[0]).toEqual({
	    key: 'heart',
	    type: 'line',
	    name: 'Battito cardiaco'
	});
	expect($scope.heartChartOptions.xAxis.key).toBe('id');
	expect($scope.heartChartOptions.xAxis.displayFormat('3'))
	    .toBe('Checkpoint #3');

	$scope.telemetries[0] = {
	    data: 'Make a coffe'
	};
	$scope.showTelemetry(0);

	expect($scope.currentTelemetry).toBe('Make a coffe');
	expect($scope.currentTelemetryIndex).toEqual(0);
    });
});
