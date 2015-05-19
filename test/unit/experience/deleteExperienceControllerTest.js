/**
  * Name: DeleteExperienceListControllerTest
  * Package: Experience
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('DeleteExperienceController Test', function () {
    var $scope, routeParams, experienceService;
    
    beforeEach(module('experience'));

    beforeEach(inject(function($controller) {
	$scope = {};
	routeParams = {};
	routeParams.experienceId = 1;
	
	experienceService = jasmine.createSpyObj('ExperienceService',
						 ['deleteExperience']);
	experienceService.deleteExperience.and.callFake(function (id, callback) {
	    if (id == 1) {
		callback(true, '');
	    } else {
		callback(false, '');
	    }
	});

	$controller('DeleteExperienceController', {
	    $scope: $scope,
	    $routeParams: routeParams,
	    ExperienceService: experienceService
	});
    }));

    it('Successfully DeleteExperience', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.deleteRequested).toBe(false);
	expect($scope.responseType).toBe('');
	expect($scope.responseMsg).toBe('');

	$scope.deleteExperience();

	expect($scope.deleteRequested).toBe(true);
	expect($scope.responseType).toBe('success');
	expect($scope.responseMsg).toBe('Esperienza cancellata.');
    });

    it('Wrong DeleteExperience', function () {
	expect($scope.experienceId).toBe(1);
	expect($scope.deleteRequested).toBe(false);
	expect($scope.responseType).toBe('');
	expect($scope.responseMsg).toBe('');

	$scope.experienceId = 2;
	$scope.deleteExperience();

	expect($scope.deleteRequested).toBe(true);
	expect($scope.responseType).toBe('danger');
	expect($scope.responseMsg).toBe("Errore nella cancellazione dell'esperienza. :(");
    });
});
