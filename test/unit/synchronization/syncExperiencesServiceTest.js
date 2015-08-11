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
	expect(dataReceived.experiences).toEqual(['never', 'cross', 'the', 'stream']);
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
