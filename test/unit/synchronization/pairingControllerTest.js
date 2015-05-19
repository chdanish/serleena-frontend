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


describe('PairingController Test', function () {
    var $scope, $route, pairingService, reloaded;

    beforeEach(module('synchronization'));

    beforeEach(inject(function($controller) {
	$scope = {};
	$route = {};
	$route.reload = function () {
	    reloaded = !reloaded};

	pairingService = jasmine.createSpyObj('PairingService', ['pairDevice']);
	pairingService.pairDevice.and.callFake(function(token, callback) {
	    if (token == 'goodToken') {
		callback(true, '');
	    } else {
		callback(false, '');
	    }
	});

	$controller('PairingController', {
	    $scope: $scope,
	    $route: $route,
	    PairingService: pairingService
	});
    }));

    it('Successfully pairDevice', function () {
	expect($scope.tempToken).toBe('');
	expect($scope.showSuccess).toBe(false);
	expect($scope.showError).toBe(false);
	expect($scope.errorMsg).toBe('');

	$scope.tempToken = 'goodToken';
	$scope.pairDevice();

	expect($scope.tempToken).toBe('goodToken');
	expect($scope.showSuccess).toBe(true);
	expect($scope.showError).toBe(false);
	expect($scope.errorMsg).toBe('');
    });

    it('Wrong pairDevice', function () {
	expect($scope.tempToken).toBe('');
	expect($scope.showSuccess).toBe(false);
	expect($scope.showError).toBe(false);
	expect($scope.errorMsg).toBe('');

	$scope.tempToken = 'badToken';
	$scope.pairDevice();

	expect($scope.tempToken).toBe('badToken');
	expect($scope.showSuccess).toBe(false);
	expect($scope.showError).toBe(true);
	expect($scope.errorMsg).toBe('Errore durante la procedura di accoppiamento :(');
    });

    it('Successfully retry', function () {
	reloaded = false;
	$scope.retry();
	expect(reloaded).toBe(true);
    });

    it('Wrong retry', function () {
	reloaded = true;
	$scope.retry();
	expect(reloaded).toBe(false);
    });
});
