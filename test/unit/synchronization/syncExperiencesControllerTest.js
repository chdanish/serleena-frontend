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
    var $scope, syncExperiencesService, successGetSyncList, experiencesSaved;
    var successSetSyncList;

    successSetSyncList = false;
    successGetSyncList = false;

    beforeEach(module('synchronization'));

    beforeEach(inject(function ($controller) {
	$scope = {};

	syncExperiencesService = jasmine.createSpyObj('SyncExperiencesService',
						      ['getSyncList',
						       'setSyncList']);
	if(successGetSyncList == false) {
	    successGetSyncList = true;
	    syncExperiencesService.getSyncList.and.callFake(function(callback) {
		callback(false, '');
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
	    SyncExperiencesService: syncExperiencesService
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
	expect($scope.experiences).toEqual(['never', 'cross', 'the', 'stream']);
	expect($scope.showMsg).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');
    });

    it('Wrong saveList', function () {
	expect($scope.experiences).toEqual(['never', 'cross', 'the', 'stream']);
	expect($scope.showMsg).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');

	$scope.saveList();

	expect($scope.showMsg).toBe(true);
	expect($scope.msgType).toBe('danger');
	expect($scope.msgText).toBe("Errore nell'aggiornamento della lista :(");
    });

    it('Successfully saveList', function () {
	expect($scope.experiences).toEqual(['never', 'cross', 'the', 'stream']);
	expect($scope.showMsg).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');
	expect(experiencesSaved).toEqual([]);

	$scope.saveList();

	expect($scope.showMsg).toBe(true);
	expect($scope.msgType).toBe('success');
	expect($scope.msgText).toBe('Lista aggiornata!');
	expect(experiencesSaved).toEqual(['never', 'cross', 'the', 'stream']);
    });

});
