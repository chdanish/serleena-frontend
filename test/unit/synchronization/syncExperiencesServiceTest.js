/**
  * Name: SyncExperiencesServiceTest
  * Package: Synchronization
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('SyncExperiencesService Test', function () {
    var httpBackend, BACKEND_URL, authService, syncExperienceService;
    var dataReceived, sucess, failure;

    var callback = function (response, data) {
	dataReceived = data;
	if (response) {
	    success = true;
	} else {
	    failure = true;
	}
    }

    beforeEach(module('synchronization'));

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);

	authService = jasmine.createSpyObj('AuthService', ['authRequest']);
	authService.authRequest.and.callFake(function (callback) {
	    callback('goodToken');
	});
	$provide.value('AuthService', authService);				     
    }));

    beforeEach(inject(function($httpBackend, BACKEND_URL, _AuthService_,
			       _SyncExperiencesService_) {
	httpBackend = $httpBackend;
	syncExperienceService = _SyncExperiencesService_;
    }));

    beforeEach(function () {
	success = false;
	failure = false;
	dataReceived = '';
    });

    it('Successfully getSyncList', function () {
	var data = {};
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	data.experiences = ['never', 'cross', 'the', 'stream'];
	httpBackend.whenGET(BACKEND_URL + "/data/sync")
	    .respond(201, data);
	syncExperienceService.getSyncList(callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toEqual(['never', 'cross', 'the', 'stream']);
    });

    it('Wrong getSyncList', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	httpBackend.whenGET(BACKEND_URL + "/data/sync")
	    .respond(404, 'error');
	syncExperienceService.getSyncList(callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });

    it('Successfully setSyncList', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	list = ['cross', 'the', 'stream'];
	
	httpBackend.whenPUT(BACKEND_URL + "/data/sync")
	    .respond(201, 'listUpdated');
	syncExperienceService.setSyncList(list, callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('listUpdated');
    });

    it('Wrong setSyncList', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	list = ['cross', 'the', 'stream'];
	
	httpBackend.whenPUT(BACKEND_URL + "/data/sync")
	    .respond(404, 'updateError');
	syncExperienceService.setSyncList(list, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('updateError');
    });
});
