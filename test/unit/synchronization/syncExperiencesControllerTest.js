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
  * Name: SyncExperiencesControllerTest
  * Package: Synchronization
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe ('SyncExperiencesController Test', function () {
    var $scope, syncExperiencesService, successGetSyncList, experiencesSaved,
			experienceService;
    var successSetSyncList;

    successSetSyncList = false;
    successGetSyncList = false;

    beforeEach(module('synchronization'));
		beforeEach(module('experience'));

    beforeEach(inject(function ($controller) {
	$scope = {};

			experienceService = jasmine.createSpyObj('ExperienceService', [
				'getExperienceList'
			]);

			experienceService.getExperienceList.and.callFake(function (callback) {
				callback(false, [['never', 'never'], ['cross', 'cross'],
					['the', 'the'], ['stream', 'stream']]);
			});

	syncExperiencesService = jasmine.createSpyObj('SyncExperiencesService',
						      ['getSyncList',
						       'setSyncList']);
	if(successGetSyncList == false) {
	    successGetSyncList = true;
	    syncExperiencesService.getSyncList.and.callFake(function(callback) {
		callback(false, []);
	    });
	} else {
	    syncExperiencesService.getSyncList.and.callFake(function(callback) {
		var exp = ['never', 'cross', 'the', 'stream'];
		callback(true, exp);
	    });
	}

	syncExperiencesService.setSyncList.and.callFake(function(experiences,
								 callback) {
	    experiencesSaved = experiences;
	    if (successSetSyncList == false) {
		successSetSyncList = true;
		callback(false, '');
	    } else {
		callback(true, '');
	    }
	});

	$controller('SyncExperiencesController', {
	    $scope: $scope,
	    SyncExperiencesService: syncExperiencesService,
			ExperienceService: experienceService
	});

    }));

    beforeEach(function () {
	experiencesSaved = [];
    });

    it('Wrong GetSyncList', function () {
	expect($scope.experiences).toEqual([]);
	expect($scope.showMsg).toBe(true);
	expect($scope.msgType).toBe('danger');
	expect($scope.msgText).toBe('Impossibile caricare la lista di sincronizzazione :(');
    });

    it('Successfully GetSyncList', function () {
			setTimeout(function () {
				expect($scope.experiences.length).toEqual(4);
				expect($scope.showMsg).toBe(false);
				expect($scope.msgType).toBe('');
				expect($scope.msgText).toBe('');
			}, 1000)
    });

    it('Wrong saveList', function () {
			setTimeout( function () {
	expect($scope.experiences.length).toEqual(4);
	expect($scope.showMsg).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');

	$scope.saveList();

	expect($scope.showMsg).toBe(true);
	expect($scope.msgType).toBe('danger');
	expect($scope.msgText).toBe("Errore nell'aggiornamento della lista :(");
			}, 1000);
    });

    it('Successfully saveList', function () {
			setTimeout( function () {
	expect($scope.experiences.length).toEqual(4);
	expect($scope.showMsg).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');
	expect(experiencesSaved).toEqual([]);

	$scope.saveList();

	expect($scope.showMsg).toBe(true);
	expect($scope.msgType).toBe('success');
	expect($scope.msgText).toBe('Lista aggiornata!');
	expect(experiencesSaved).toEqual(['never', 'cross', 'the', 'stream']);
				}, 1000);
    });

});
