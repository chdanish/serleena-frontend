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
  * Name: ExperienceWizardControllerTest
  * Package: Experience
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('ExperienceWizardController Test', function () {
    var $scope, map, serleenaDataService, experienceService, routeParams;
    

    function createMap() {
	map.drawCheckpoint.and.callFake(function(map) {
	    return map.concat('.2');
	});
	map.getCheckpointPosition.and.callFake(function (m) {
	    return m;
	});
	map.drawCustomPoint.and.callFake(function(map) {
	    return map.concat('.point');
	});
	map.initMap.and.callFake(function(id) {
	    return 'Hill Valley';
	});
	map.drawPerimeter.and.callFake(function(map) {
	    return 'California';
	});
	map.closePerimeter.and.callFake(function(map, rectangle) {
	    return "Doc's House";
	});

	map.drawPOI.and.callFake(function(map, lat, lng, name) {
	    return 'Drawed';
	});
    }

    function createSerleena() {
	serleenaDataService.getPaths.and.callFake(function(ne, sw, callback) {
	    var paths = [{
		name: 'path',
		points: 3,
	    }];
	    callback(true, paths);
	});

	serleenaDataService.getPOIs.and.callFake(function(from, to, callback) {
	    var poi = [{
		name: 'onlyOne',
		lat: '',
		lng: '',
	    }];
	    callback(true, poi);
	});
    }

    beforeEach(module('experience'));

    beforeEach(inject(function($controller, $rootScope) {
	$scope = $rootScope;
	map = jasmine.createSpyObj('Map', ['initMap', 'removeTrackFromMap',
					   'drawCheckpoint', 'drawTrack',
					   'removeCheckpointFromMap',
					   'getCheckpointPosition', 'drawPath',
					   'drawCustomPoint', 'drawPOI',
					   'drawPerimeter', 'closePerimeter',
					   'removeCustomPointFromMap',
					   'enablePerimeterEditing',
					   'removePOIFromMap',
					   'drawCheckpointFromObject']);
	createMap();
	serleenaDataService = jasmine.createSpyObj('SerleenaDataService',
						['getPaths', 'getPOIs']);
	createSerleena();

	experienceService = jasmine.createSpyObj('ExperienceService',
						 ['saveExperience']);
	experienceService.saveExperience.and.callFake(
	    function(name, tracks, from, to, poi, points, callback) {
		if (name == 'BackToFuture') {
		    callback(true, '');
		} else {
		    callback(false, '');
		}
	    });

	routeParams = {};

	$controller('ExperienceWizardController', {
	    $scope: $scope,
	    Map: map,
	    SerleenaDataService: serleenaDataService,
	    ExperienceService: experienceService,
	    $routeParams:  routeParams
	});
    }));

    beforeEach(function () {
	$scope.tracks = [];
    });

    it('Successfully linkMap', function () {
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.tracks).toEqual([]);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.$broadcast('hhMapLink', 1);

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe(1);
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.tracks).toEqual([]);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
    });

    it('Successfully addNewTrack', function () {
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.tracks).toEqual([]);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.addNewTrack();

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.tracks).toEqual([{
	    name: 'Nuovo percorso',
	    showRename: true,
	    checkMarkers: [],
	    checkpoints: [],
	}]);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
    });

    it('Successfully showTrackRename', function () {
	$scope.tracks.push({
	    name: 'Road to Gozer',
	    showRename: false,
	    checkMarkers: [],
	    checkpoints: [],
	});
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
	expect($scope.tracks).toEqual([{
	    name: 'Road to Gozer',
	    showRename: false,
	    checkMarkers: [],
	    checkpoints: [],
	}]);

	$scope.showTrackRename(0);

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
	expect($scope.tracks).toEqual([{
	    name: 'Road to Gozer',
	    showRename: true,
	    checkMarkers: [],
	    checkpoints: [],
	}]);
    });

    it('Successfully closeTrackRename', function () {
	$scope.tracks.push({
	    name: 'Road to Gozer',
	    showRename: true,
	    checkMarkers: [],
	    checkpoints: [],
	});
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
	expect($scope.tracks).toEqual([{
    	    name: 'Road to Gozer',
	    showRename: true,
	    checkMarkers: [],
	    checkpoints: [],
	}]);

	$scope.closeTrackRename(0);

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
	expect($scope.tracks).toEqual([{
	    name: 'Road to Gozer',
	    showRename: false,
	    checkMarkers: [],
	    checkpoints: [],
	}]);
    });

    it('Successfully editTrack', function () {
	$scope.tracks.push({
	    name: 'Road to Gozer',
	    showRename: false,
	    checkMarkers: [],
	    checkpoints: [],
	});
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
	
	$scope.editTrack(0);

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(0);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');
    });

    it('Successfully deleteTrack', function () {
	$scope.addNewTrack();
	$scope.previousTrackIndex = 0;
	
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(0);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.deleteTrack(0);

	expect($scope.tracks).toEqual([]);
	expect($scope.previousTrackIndex).toBe(0);

	$scope.previousTrackIndex = 1;
	$scope.addNewTrack();
	$scope.addNewTrack();

	$scope.deleteTrack(0);

	expect($scope.previousTrackIndex).toBe(0);
	expect($scope.tracks).toEqual([{
	    name: 'Nuovo percorso',
	    showRename: true,
	    checkMarkers: [],
	    checkpoints: [],
	}]);
    });

    it('Successfully addNewCheckpoint', function () {
	var currentTrackIndex = 0;
	
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.addNewTrack();
	$scope.currentTrackIndex = currentTrackIndex;
	$scope.map = '101';
	
	$scope.addNewCheckpoint();

	expect($scope.tracks[currentTrackIndex].checkMarkers)
	    .toEqual(['101.2']);
    });

    it('Successfully deleteCheckpoint', function () {
	var currentTrackIndex = 0;

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	// Configura due checkpoint
	$scope.addNewTrack();
	$scope.currentTrackIndex = currentTrackIndex;
	$scope.map = '101';
	$scope.addNewCheckpoint();
	$scope.map = '102';
	$scope.addNewCheckpoint();

	$scope.deleteCheckpoint(0);

	expect($scope.tracks[currentTrackIndex].checkMarkers.length)
	    .toBe(1);
	expect($scope.tracks[currentTrackIndex].checkMarkers)
	    .toEqual(['102.2']);
    })

    it('Successfully saveCheckpoints', function () {
	var currentTrackIndex = 0;

	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.addNewTrack();
	$scope.currentTrackIndex = currentTrackIndex;
	$scope.map = '102';
	$scope.addNewCheckpoint();

	$scope.saveCheckpoints();

	expect($scope.previousTrackIndex).toBe(currentTrackIndex);
	expect($scope.currentTrackIndex).toBe(-1);
    });

    it('Successfully addNewCustomPoint', function () {
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.map = 'Hill Valley';
	$scope.addNewCustomPoint();

	expect($scope.customPoints).toEqual([{
	    marker: 'Hill Valley.point'
	}]);
    });

    it('Successfully deleteCustomPoint', function () {
	$scope.map = 'Hill Valley';
	$scope.addNewCustomPoint();
	
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([{
	    marker: 'Hill Valley.point'
	}]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.deleteCustomPoint(0);

	expect($scope.customPoints).toEqual([]);
    });

    it('Successfully onWizardNextStep', function () {
	$scope.mapTagId = '1985';
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('1985');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.$broadcast('hhWizardNextStep', 1);

	expect($scope.showMap).toBe(true);
	expect($scope.map).toBe('Hill Valley');
	expect($scope.rectangle).toBe('California');

	$scope.$broadcast('hhWizardNextStep', 2);

	expect($scope.perimeter).toBe("Doc's House");
	expect($scope.showTracks).toBe(true);
	
	$scope.perimeter = {
	    ne: '',
	    sw: '',
	};
	$scope.editMode = true;
	$scope.editExperiencePoi = [{
		name: 'onlyOne',
		lat: '',
		lng: '',
	}];

	$scope.$broadcast('hhWizardNextStep', 3);

	expect($scope.poi[0].selected).toBe(true);
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(true);

	$scope.$broadcast('hhWizardNextStep', 4);

	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(true);
    });

    it('Successfully onWizardCompleted', function () {
	$scope.mapTagId = '1985';
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('1985');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.perimeter = {
	    ne: '',
	    sw: '',
	};
	$scope.name = 'BackToFuture';

	$scope.$broadcast('hhWizardCompleted');

	expect($scope.saveType).toBe('success');
	expect($scope.saveMsg).toBe('Esperienza salvata con successo!');
    });

    it('Wrong onWizardCompleted', function () {
	$scope.mapTagId = '1985';
	expect($scope.showWizard).toBe(true);
	expect($scope.expName).toBe('');
	expect($scope.mapTagId).toBe('1985');
	expect($scope.showTracks).toBe(false);
	expect($scope.showPOISelection).toBe(false);
	expect($scope.showCustomPointSelection).toBe(false);
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.previousTrackIndex).toBe(-1);
	expect($scope.poi).toEqual([]);
	expect($scope.customPoints).toEqual([]);
	expect($scope.saveType).toBe('');
	expect($scope.saveMsg).toBe('');

	$scope.perimeter = {
	    ne: '',
	    sw: '',
	};
	$scope.name = 'BackToFuture101';

	$scope.$broadcast('hhWizardCompleted');

	expect($scope.saveType).toBe('danger');
	expect($scope.saveMsg).toBe("Errore nel salvataggio dell'esperienza :(");
    });

    it('Successfully disableEditMode', function () {
	$scope.editMode = true;
	$scope.addNewTrack();

	$scope.disableEditMode();

	expect($scope.editMode).toBe(false);
	expect($scope.tracks).toEqual([]);
    });	
});
