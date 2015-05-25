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
  * Name: TelemetryServiceTest
  * Package: Telemetry
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per TelemetryService
  *
  */

describe('TelemetryService Test', function () {
    var httpBackend, BACKEND_URL, authService, telemetryService;
    var dataReceived, success, failure;

    var callback = function (response, data) {
	dataReceived = data;
	if (response) {
	    success = true;
	} else {
	    failure = true;
	}
    };
    
    beforeEach(function () {
	angular.mock.module('angularChart');
	angular.mock.module('720kb.socialshare');
	module('telemetry');
    });


    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);

	authService = jasmine.createSpyObj('AuthService', ['authRequest']);
	authService.authRequest.and.callFake(function (callback) {
	    callback('goodToken');
	});

	$provide.value('AuthService', authService);
    }));

    beforeEach(inject(function($httpBackend, _AuthService_,
			       BACKEND_URL, _TelemetryService_) {
	httpBackend = $httpBackend;
	telemetryService = _TelemetryService_;
    }));

    beforeEach(function () {
	dataReceived = '';
	failure = false;
	success = false;
    });
    
    it('Successfully getTelemetryList', function () {
	var experienceId = 42;
	var trackId = 988;

	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId +
			    "/tracks/" + trackId + "/telemetries")
	    .respond(201, 'loaded');
	telemetryService.getTelemetryList(experienceId, trackId, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('loaded');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong getTelemetryList', function () {
	var experienceId = 42;
	var trackId = 988;

	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId +
			    "/tracks/" + trackId + "/telemetries")
	    .respond(404, 'error');
	telemetryService.getTelemetryList(experienceId, trackId, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });

    it('Successfully getTelemetryDetails', function () {
	var experienceId = 42;
	var trackId = 988;
	var telemetryId = 23;

	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId +
			    "/tracks/" + trackId + "/telemetries/" + telemetryId)
	    .respond(201, 'loaded');
	telemetryService.getTelemetryDetails(experienceId, trackId, telemetryId,
					     callback);
	httpBackend.flush();

	expect(dataReceived).toBe('loaded');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong getTelemetryDetails', function () {
	var experienceId = 42;
	var trackId = 988;
	var telemetryId = 23;

	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenGET(BACKEND_URL + "/experiences/" + experienceId +
			    "/tracks/" + trackId + "/telemetries/" + telemetryId)
	    .respond(404, 'error');
	telemetryService.getTelemetryDetails(experienceId, trackId, telemetryId,
					     callback);
	httpBackend.flush();

	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });
});
