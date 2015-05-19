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

describe('PairingService Test', function () {
    var httpBackend, authService, BACKEND_URL, pairingService;
    var dataReceived, success, failure;

    var callback = function (response, data) {
	dataReceived = data;
	if (response) {
	    success = true;
	} else {
	    failure = true;
	}
    };

    beforeEach(module('synchronization'));

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);
	authService = jasmine.createSpyObj('AuthService', ['authRequest']);
	authService.authRequest.and.callFake(function (callback) {
	    callback('goodToken');
	});
	$provide.value('AuthService', authService);
    }));

    beforeEach(inject(function ($httpBackend, BACKEND_URL, _AuthService_,  _PairingService_) {
	httpBackend = $httpBackend;
	pairingService = _PairingService_;
    }));

    beforeEach(function () {
	dataReceived = '';
	success = false;
	failure = false;
    });

    it('Successfully pairDevice', function () {
	var tempToken = 'token';
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenPUT(BACKEND_URL + "/users/pair")
	    .respond(201, 'paired');
	pairingService.pairDevice(tempToken, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('paired');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong pairDevice', function () {
	var tempToken = 'token';
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	httpBackend.whenPUT(BACKEND_URL + "/users/pair")
	    .respond(404, 'unPaired');
	pairingService.pairDevice(tempToken, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('unPaired');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });
});
