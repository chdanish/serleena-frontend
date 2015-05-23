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

	$controller('ExperienceDetailsController', {
	    $scope: $scope,
	    $routeParams: routeParams,
	    ExperienceService: experienceService,
	    Map: map
	});
    }));

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
	    checkpoints: [''],
	    maps: 'Hill Valley',
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
