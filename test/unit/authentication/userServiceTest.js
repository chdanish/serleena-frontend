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
*Name:LoginControllerTest
*Package:Authentication
*Author:MatteoLisotto<matteo.lisotto@gmail.com>
*
*History
*VersionProgrammerChanges
*1.0.0MatteoLisottoCreafileetestperLoginController
*
*/

describe('UserServiceTest', function() {
    var httpBackend, BACKEND_URL, userService;
    var email, password, dataReceived, success, failure;

    email = 'test@test.it';
    password = 'pwd';

    var callback = function(response, data) {
	dataReceived = data;
	if(response == true) {
	    success = true;
	} else {
	    failure = true;
	}
    }

    beforeEach(function() {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);
    }));

    beforeEach(inject(function($httpBackend, BACKEND_URL, _UserService_) {
	httpBackend = $httpBackend;
	userService = _UserService_;
    }));

    beforeEach(function() {
	dataReceived='';
	success=false;
	failure=false;
    });

    it('Successfully registerUser', function() {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	//Set the respond for /user
	httpBackend.whenPOST(BACKEND_URL + "/user")
	    .respond(201, 'registered', '', '', '');
	userService.registerUser(email, password, callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('registered');
    });

    it('Error registerUser',function(){
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	//Set the respond for /user
	httpBackend.whenPOST(BACKEND_URL + "/user")
	    .respond(404, 'error', '', '', '');
	userService.registerUser(email, password, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });

    it('Successfully recoverUser',function() {
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	//Set the respond for /user/recovery
	httpBackend.whenPUT(BACKEND_URL + "/user/recovery")
	    .respond(201, 'recovered', '', '', '');
	userService.recoverUser(email, callback);
	httpBackend.flush();

	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('recovered');
    });

    it('WrongrecoverUser',function(){
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(dataReceived).toBe('');
	//Set the respond for /user/recovery
	httpBackend.whenPUT(BACKEND_URL + "/user/recovery")
	.respond(404,'error','','','');
	userService.recoverUser(email, callback);
	httpBackend.flush();

	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(dataReceived).toBe('error');
    });
});
