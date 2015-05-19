/**
  * Name: ExperienceServiceTest
  * Package: Experience
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('ExperienceService Test', function () {
    var httpBackend, authService, experienceService, BACKEND_URL;
    var success, failure, dataReceived;

    var callback = function (response, data) {
	dataReceived = data;
	if(response) {
	    success = true;
	} else {
	    failure = true;
	}
    }

    beforeEach(module('experience'));

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
			       _ExperienceService_) {
	httpBackend = $httpBackend;
	experienceService = _ExperienceService_;
    }));

    beforeEach(function () {
	success = false;
	failure = false;
	dataReceived = '';
    });

    it('Successfully DeleteExperience', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	experienceId = 1;

	httpBackend.whenDELETE(BACKEND_URL + "/experiences/" + experienceId)
	    .respond(201, 'deleted');
	experienceService.deleteExperience(experienceId, callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('deleted');
    });

    it('Wrong DeleteExperience', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	experienceId = 1;

	httpBackend.whenDELETE(BACKEND_URL + "/experiences/" + experienceId)
	    .respond(404, 'error');
	experienceService.deleteExperience(experienceId, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });
});
