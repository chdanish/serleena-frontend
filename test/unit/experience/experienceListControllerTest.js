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
