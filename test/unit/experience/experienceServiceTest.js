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
	    .respond(201, ['La banda!'], '', '', '');
	experienceService.getExperienceList(callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived[0]).toBe('La banda!');
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
