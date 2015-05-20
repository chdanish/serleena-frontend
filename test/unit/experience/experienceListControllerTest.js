/**
  * Name: ExperienceListController
  * Package: Experience
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('ExperienceListController Test', function () {
    var $scope, experienceService;
    var successGetExperienceList = true;
    var noExperience = true;
    
    beforeEach(module('experience'));

    beforeEach(inject(function($controller) {
	$scope = {};

	experienceService = jasmine.createSpyObj('ExperienceService',
						 ['getExperienceList']);
	experienceService.getExperienceList.and.callFake(function (callback) {
	    var data = [];
	    if (successGetExperienceList && noExperience) {
		noExperience = false;
		callback(true, data);
	    } else if (successGetExperienceList && !noExperience) {
		successGetExperienceList = false;
		data = ['never', 'cross', 'the', 'stream'];
		callback(true, data);
	    } else {
		callback(false, data);
	    }
	});
	    
	$controller('ExperienceListController', {
	    $scope: $scope,
	    ExperienceService: experienceService
	});

    }));

    it('Successfully ExperienceListController with noExperience', function () {
	expect($scope.experiences).toEqual([]);
	expect($scope.numExperiences).toBe(0);
	expect($scope.noExperiences).toBe(true);
	expect($scope.error).not.toBeDefined();
	expect($scope.errorMsg).not.toBeDefined();
	expect($scope.showAlert).toBe(true);
    });

    it('Successfully ExperienceListController with Experience', function () {
	expect($scope.experiences).toEqual(['never', 'cross', 'the', 'stream']);
	expect($scope.numExperiences).toBe(4);
	expect($scope.noExperiences).toBe(false);
	expect($scope.error).not.toBeDefined();
	expect($scope.errorMsg).not.toBeDefined();
	expect($scope.showAlert).not.toBeDefined();
    });

    it('Wrong ExperienceListController', function () {
	expect($scope.experiences).not.toBeDefined();
	expect($scope.numExperiences).not.toBeDefined();
	expect($scope.noExperience).not.toBeDefined();
	expect($scope.error).toBe(true);
	expect($scope.errorMsg).toBe('Errore di comunicazione con il server :(');
	expect($scope.showAlert).toBe(true);
    });
});	
