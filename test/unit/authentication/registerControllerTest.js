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

describe('registerController Test', function () {
    var $scope, userService;

    beforeEach(function() {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(inject(function($controller) {
	$scope = {};

	userService = jasmine.createSpyObj('UserService', ['registerUser']);
	userService.registerUser.and.callFake(function (email, pwd){
	    $scope.done = true;
	    if (email.indexOf('@') > -1 && pwd == 'pwd') {
		$scope.enableNext = true;
		$scope.msgText = "Registrazione effettuata! Prosegui abbinando il tuo \
                            dispositivo a serleena Cloud";
		$scope.msgType = "success";
	    } else {
		$scope.msgText = "Errore nella registrazione :(";
		$scope.msgType = "danger";
	    }
	});    

	$controller('RegisterController', {
	    $scope : $scope,
	    UserService: userService
	});
    }));

    it('Successfully registerUser', function () {
	expect($scope.done).toBe(false);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('');
	expect($scope.password).toBe('');
	expect($scope.msgText).toBe('');
	expect($scope.msgType).toBe('');

	$scope.email = 'test@test.it';
	$scope.password = 'pwd';
	$scope.registerUser();

	expect($scope.done).toBe(true);
	expect($scope.enableNext).toBe(true);
	expect($scope.email).toBe('test@test.it');
	expect($scope.password).toBe('pwd');
	expect($scope.msgText).toBe('Registrazione effettuata! Prosegui abbinando il tuo \
                            dispositivo a serleena Cloud');
	expect($scope.msgType).toBe('success');
    });
    
    it('Wrong email registerUser', function () {
	expect($scope.done).toBe(false);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('');
	expect($scope.password).toBe('');
	expect($scope.msgText).toBe('');
	expect($scope.msgType).toBe('');

	$scope.email = 'testtest.it';
	$scope.password = 'pwd';
	$scope.registerUser();
	
	expect($scope.done).toBe(true);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('testtest.it');
	expect($scope.password).toBe('pwd');
	expect($scope.msgText).toBe('Errore nella registrazione :(');
	expect($scope.msgType).toBe('danger');
    });

    it('Wrong pwd registerUser', function () {
	expect($scope.done).toBe(false);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('');
	expect($scope.password).toBe('');
	expect($scope.msgText).toBe('');
	expect($scope.msgType).toBe('');

	$scope.email = 'test@test.it';
	$scope.password = 'pwda';
	$scope.registerUser();

	expect($scope.done).toBe(true);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('test@test.it');
	expect($scope.password).toBe('pwda');
	expect($scope.msgText).toBe('Errore nella registrazione :(');
	expect($scope.msgType).toBe('danger');
    });

});
						 
