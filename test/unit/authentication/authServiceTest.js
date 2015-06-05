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
  * Name: LoginControllerTest
  * Package: Authentication
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('AuthService Test', function () {
    var httpBackend, BACKEND_URL, authService, cookies, scope;
    var email, password, dataReceived, success, failure;

    email = 'test@test.it';
    password = 'pwd';
    
    var callback = function (response, data) {
	dataReceived = data;
	if (response == true) {
	    success = true;
	} else {
	    failure = true;
	}
    }	

    beforeEach(function () {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);
    }));

    beforeEach(inject(function ($httpBackend, $cookies, $rootScope,
				BACKEND_URL, _AuthService_) {
	httpBackend = $httpBackend;
	authService = _AuthService_;
	cookies = $cookies;
	scope = $rootScope;
    }));

    beforeEach(function () {
	dataReceived = '';
	success = false;
	failure = false;
    });

    it('Successfully loginUser', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(cookies.serleena_user).not.toBeDefined();
	expect(cookies.serleena_token).not.toBeDefined();
	expect(scope.userLogged).not.toBeDefined();

	httpBackend.whenGET(BACKEND_URL + "/users/token").respond(
	    201, 'authenticated', '', '', '');
	authService.loginUser(email, password, callback);
	httpBackend.flush();
	
	expect(dataReceived).toBe(null);
	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(cookies.serleena_user).toBe('test@test.it');
	expect(cookies.serleena_token).toBe('authenticated');
	expect(scope.userLogged).toBe(true);
    });

    it('Wrong loginUser', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(cookies.serleena_user).not.toBeDefined();
	expect(cookies.serleena_token).not.toBeDefined();
	expect(scope.userLogged).not.toBeDefined();

	httpBackend.whenGET(BACKEND_URL + "/users/token").respond(
	    401, '{"status":401}', '', '', '');
	authService.loginUser(email, password, callback);
	httpBackend.flush();
	
	expect(dataReceived.status).toBe(401);
	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(cookies.serleena_user).not.toBeDefined();
	expect(cookies.serleena_token).not.toBeDefined();
	expect(scope.userLogged).not.toBeDefined();
    });

    it('Successfully logoutUser', function () {
	scope.userLogged = true
	cookies.serleena_user = 'user01';
	cookies.serleena_token = 'authenticated';
	authService.logoutUser(function () {});

	expect(scope.userLogged).toBe(false);
	expect(cookies.serleena_user).not.toBeDefined();
	expect(cookies.serleena_token).not.toBeDefined();
    });

    it('User not logged', function () {
	var logged = authService.isLogged();
	expect(logged).toBe(false);
    });

    it('User logged', function () {
	cookies.serleena_user = 'user01';
	var logged = authService.isLogged();
	expect(logged).toBe(true);
    });

    it ('AuthRequest', function () {
	cookies.serleena_token = 'authenticated';
	var authResponse;
	var authcall = function (value) {
	    authResponse = value;
	}
	expect(authResponse).not.toBeDefined();
	authService.authRequest(authcall);
	expect(authResponse).toBe('authenticated');
    });
});
