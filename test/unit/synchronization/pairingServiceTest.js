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
  * Name: PairingController
  * Package: Authentication
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('PairingService Test', function () {
    var httpBackend, authService, BACKEND_URL, pairingService;
    var dataReceived, success, failure;

    var callback = function (response, data) {
	dataReceived = data;
	if (response) {
	    success = true;
	} else {
	    failure = true;
	}
    };

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

    beforeEach(inject(function ($httpBackend, BACKEND_URL, _AuthService_,  _PairingService_) {
	httpBackend = $httpBackend;
	pairingService = _PairingService_;
    }));

    beforeEach(function () {
	dataReceived = '';
	success = false;
	failure = false;
    });

    it('Successfully pairDevice', function () {
	var tempToken = 'token';
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenPUT(BACKEND_URL + "/users/pair")
	    .respond(201, 'paired');
	pairingService.pairDevice(tempToken, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('paired');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong pairDevice', function () {
	var tempToken = 'token';
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenPUT(BACKEND_URL + "/users/pair")
	    .respond(404, 'unPaired');
	pairingService.pairDevice(tempToken, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('unPaired');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });
});
