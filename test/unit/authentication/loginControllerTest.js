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

describe('LoginController Test', function () {
    var $scope, location, authService;

    beforeEach(function() {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(inject(function($controller) {
	$scope = {};

	location = jasmine.createSpyObj('location', ['path']);

	authService = jasmine.createSpyObj('AuthService', ['loginUser']);
	authService.loginUser.and.callFake(function (email, pwd, callback) {
	    if (email == "test@test.it" && pwd == "pwd") {
		callback(true, '');
	    } else {
		callback(false, '');
	    }
	});
	
	$controller('LoginController', {
	    $scope: $scope,
	    $location: location,
	    AuthService: authService
	});
    }));

    it('Successfully login', function () {
	$scope.email = "test@test.it";
	$scope.password = "pwd";
	$scope.loginUser();

	expect($scope.email).toBeDefined();
	expect($scope.password).toBeDefined();

	expect($scope.email).toBe("test@test.it");
	expect($scope.password).toBe("pwd");
	expect(location.path).toHaveBeenCalledWith("/dashboard");
    });

    it('Wrong login', function () {
	$scope.email = "wrong@test.it";
	$scope.password = "pwd";
	$scope.loginUser();

	expect($scope.email).toBeDefined();
	expect($scope.password).toBeDefined();
	expect($scope.errorMessage).toBeDefined();
	expect($scope.showError).toBeDefined();
	
	expect($scope.email).toBe("wrong@test.it");
	expect($scope.password).toBe("pwd");
	expect($scope.errorMessage).toBe("Accesso fallito :(");
	expect($scope.showError).toBe(true);
    });
});
