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
