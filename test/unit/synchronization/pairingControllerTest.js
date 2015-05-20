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
