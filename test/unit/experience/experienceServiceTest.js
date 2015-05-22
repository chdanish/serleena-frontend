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
	var experienceId = 1;

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
	var experienceId = 1;

	httpBackend.whenDELETE(BACKEND_URL + "/experiences/" + experienceId)
	    .respond(404, 'error');
	experienceService.deleteExperience(experienceId, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });

    it('Successfully getExperienceList', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	httpBackend.whenGET(BACKEND_URL + "/experiences")
	    .respond(201, {experiences: 'La banda!'}, '', '', '');
	experienceService.getExperienceList(callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('La banda!');
    });


    it('Wrong getExperienceList', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	httpBackend.whenGET(BACKEND_URL + "/experiences")
	    .respond(404, 'error');
	experienceService.getExperienceList(callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });

    it('Successfully saveExperience', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	var name = 'BluesBrothers';
	var tracks = 12;
	var from = 'Chicago';
	var to = 'Palace Hotel';

	httpBackend.whenPOST(BACKEND_URL + "/experiences")
	    .respond(201, 'Rawhide');
	experienceService.saveExperience(name, tracks, from, to, '', '',
					 callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('Rawhide');
    });

    it('Wrong saveExperience', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	var name = 'BluesBrothers';
	var tracks = 12;
	var from = 'Chicago';
	var to = 'Palace Hotel';

	httpBackend.whenPOST(BACKEND_URL + "/experiences")
	    .respond(404, 'error');
	experienceService.saveExperience(name, tracks, from, to, '', '',
					 callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });

    it('Successfully getExperienceDetails', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	var experienceId = 1;

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId)
	    .respond(201, 'concertForTheOrphanage');
	experienceService.getExperienceDetails(experienceId, callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('concertForTheOrphanage');
    });

    it('Wrong getExperienceDetails', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	var experienceId = 1;

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId)
	    .respond(404, 'error');
	experienceService.getExperienceDetails(experienceId, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });
   
    it('Successfully getTrackDetails', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	var experienceId = 1;
	var trackId = 2;

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId
			     + "/tracks/" + trackId)
	    .respond(201, 'BluesBrothers');
	experienceService.getTrackDetails(experienceId, trackId, callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('BluesBrothers');
    });

    it('Wrong getTrackDetails', function () {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');

	var experienceId = 1;
	var trackId = 2;

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId
			     + "/tracks/" + trackId)
	    .respond(404, 'error');
	experienceService.getTrackDetails(experienceId, trackId, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });
});
