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
    var $scope, userService, authService;

    beforeEach(function() {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(inject(function($controller) {
	$scope = {};

	userService = jasmine.createSpyObj('UserService', ['registerUser']);
	userService.registerUser.and.callFake(function (email, pwd, callback) {
	    $scope.done = true;
	    if (email.indexOf('@') > -1 && (pwd == 'pwd'|| pwd == 'notLogged')){
		callback(true, '');
	    } else {
		callback(false, '');
	    }
	});

	authService = jasmine.createSpyObj('AuthService', ['loginUser']);
	authService.loginUser.and.callFake(function (email, password, callback){
	    if (email == 'test@test.it' && password == 'pwd') {
		callback(true, '')
	    } else {
		callback(false, '');
	    }
	});

	$controller('RegisterController', {
	    $scope : $scope,
	    UserService: userService,
	    AuthService: authService
	});
    }));

    it('Successfully registerUser and logged', function () {
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
	expect($scope.msgText).toBe('Registrazione effettuata! Prosegui abbinando il \
                                tuo dispositivo a serleena Cloud');
	expect($scope.msgType).toBe('success');
    });

    it('Successfully registerUser but not logged', function () {
	expect($scope.done).toBe(false);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('');
	expect($scope.password).toBe('');
	expect($scope.msgText).toBe('');
	expect($scope.msgType).toBe('');

	$scope.email = 'test@test.it';
	$scope.password = 'notLogged';
	$scope.registerUser();

	expect($scope.done).toBe(true);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('test@test.it');
	expect($scope.password).toBe('notLogged');
	expect($scope.msgText).toBe("Registrazione avvenuta ma non è stato possibile \
                              autenticare l'utente. Contattare un \
                              amministratore :(");
	expect($scope.msgType).toBe('danger');
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
	$scope.password = 'wrong';
	$scope.registerUser();

	expect($scope.done).toBe(true);
	expect($scope.enableNext).toBe(false);
	expect($scope.email).toBe('test@test.it');
	expect($scope.password).toBe('wrong');
	expect($scope.msgText).toBe('Errore nella registrazione :(');
	expect($scope.msgType).toBe('danger');
    });

});
