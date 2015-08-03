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
  * Name: ExperienceDetailsControllerTest
  * Package: Experience
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */
describe('ExperienceDetailsController', function () {
    var $scope, routeParams, map, experienceService;
    var firstCall = true;
    
    beforeEach(module('experience'));

    beforeEach(inject(function($controller, $rootScope) {
	$scope = $rootScope.$new();
	routeParams = {};
	routeParams.experienceId = 8;

	map = jasmine.createSpyObj('Map', ['removeTrackFromMap',
					   'removeCheckpointFromMap',
					   'drawCheckpointFromPosition',
					   'drawTrack']);
	experienceService = jasmine.createSpyObj('ExperienceService',
						 ['getExperienceDetails',
						 ]);
	experienceService.getExperienceDetails.and.callFake(
	    function(id, callback) {
		var data = {
		    points_of_interest: [],
		    user_points: [],
		    tracks: []
		};
		if (firstCall) {
		    firstCall = false;
		    callback(true, data);
		} else {
		    callback(false, data);
		}
	    });

	$controller('ExperienceDetailsController', {
	    $scope: $scope,
	    $routeParams: routeParams,
	    ExperienceService: experienceService,
	    Map: map
	});
    }));

    it('With Experience', function () {
	expect($scope.experience).toBeDefined();
    });
    
    it('Successfully showTrack', function () {
	expect($scope.experienceId).toBe(8);
	expect($scope.experience).toBeDefined();
	expect($scope.maps).toBeDefined();
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.currentTrackDraw).toBe(null);
	expect($scope.currentCheckpoints).toEqual([]);

	$scope.maps = {
	    tracks: {
		maps: 'yo',
	    },
	};
	$scope.experience.tracks = [];
	
	$scope.experience.tracks.push({
			checkPoints: [''],
	    maps: 'Hill Valley'
	});
	$scope.showTrack(0);

	expect($scope.currentTrackIndex).toBe(0);	
    });

    it('Successfully linkMaps poi', function () {
	expect($scope.experienceId).toBe(8);
	expect($scope.experience).toBeDefined();
	expect($scope.maps).toBeDefined();
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.currentTrackDraw).toBe(null);
	expect($scope.currentCheckpoints).toEqual([]);

	$scope.$broadcast('hhMapLink', 'map-details-poi');

	expect($scope.maps.poi.id).toBe('map-details-poi');
    });

    it('Successfully linkMaps points', function () {
	expect($scope.experienceId).toBe(8);
	expect($scope.experience).toBeDefined();
	expect($scope.maps).toBeDefined();
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.currentTrackDraw).toBe(null);
	expect($scope.currentCheckpoints).toEqual([]);

	$scope.$broadcast('hhMapLink', 'map-details-points');

	expect($scope.maps.points.id).toBe('map-details-points');
    });

    it('Successfully linkMaps tracks', function () {
	expect($scope.experienceId).toBe(8);
	expect($scope.experience).toBeDefined();
	expect($scope.maps).toBeDefined();
	expect($scope.currentTrackIndex).toBe(-1);
	expect($scope.currentTrackDraw).toBe(null);
	expect($scope.currentCheckpoints).toEqual([]);

	$scope.$broadcast('hhMapLink', 'map-details-tracks');

	expect($scope.maps.tracks.id).toBe('map-details-tracks');
    });

});
