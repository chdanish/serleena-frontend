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
