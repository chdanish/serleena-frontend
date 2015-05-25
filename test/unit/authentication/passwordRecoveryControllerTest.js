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

describe('PasswordRecoveryController test', function () {
    var $scope, userService;

    beforeEach(function () {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(inject(function($controller) {
	$scope = {};

	userService = jasmine.createSpyObj('UserService', ['recoverUser']);
	userService.recoverUser.and.callFake(function(email, callback) {
	    $scope.done = true;
	    if(email == 'test@test.it') {
		callback(true, '');
	    } else {
		callback(false, '');
	    }
	});

	$controller('PasswordRecoveryController', {
	    $scope: $scope,
	    UserService: userService
	});
    }));

    it('Successfully recoverPassoword', function() {
	expect($scope.done).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');

	$scope.email = 'test@test.it';
	$scope.recoverPassword();

	expect($scope.done).toBe(true);
	expect($scope.msgType).toBe('primary');
	expect($scope.msgText).toBe('Richiesta di recupero password inoltrata!');
    });

    it('Wrong recoverPassoword', function () {
	expect($scope.done).toBe(false);
	expect($scope.msgType).toBe('');
	expect($scope.msgText).toBe('');

	$scope.email = 'wrong@test.it';
	$scope.recoverPassword();

	expect($scope.done).toBe(true);
	expect($scope.msgType).toBe('danger');
	expect($scope.msgText).toBe('Errore nella richiesta :(');
    });

});
