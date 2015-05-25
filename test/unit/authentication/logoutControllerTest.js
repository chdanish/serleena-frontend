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

describe ('LogoutController Test', function () {
    var $scope, location, authService;

    beforeEach(function () {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(inject(function($controller) {
	$scope = {};
	location = jasmine.createSpyObj('location', ['path']);

	authService = jasmine.createSpyObj('AuthService', ['logoutUser']);
	authService.logoutUser.and.callFake(function (callback) {
	    callback();
	});

	$controller('LogoutController', {
	    $scope: $scope,
	    $location: location,
	    AuthService: authService
	});
    }));

    it('Test', function () {
	$scope.logoutUser();
	expect(location.path).toHaveBeenCalledWith('/');
    });
});
