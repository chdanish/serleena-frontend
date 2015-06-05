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
  * Name: SerleenaDataServiceTest
  * Package: Map
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per SerleenaDataService
  *
  */

describe('SerleenaDataService Test', function () {
    var httpBackend, BACKEND_URL, serleenaDataService;
    var dataReceived, failure, success;

    var callback = function (response, data) {
	dataReceived = data;
	if(response) {
	    success = true;
	} else {
	    failure = true;
	}
    };
	
    beforeEach(module('map'));

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);
    }));

    beforeEach(inject(function($httpBackend, _SerleenaDataService_) {
	httpBackend = $httpBackend;
	serleenaDataService = _SerleenaDataService_;
    }));

    beforeEach(function () {
	dataReceived = '';
	success = false;
	failure = false;
    });

    it('Successfully getPaths', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;
	var data = {
	    paths: 'Hokuto Road'
	};

	httpBackend.whenGET(BACKEND_URL + "/paths/" + from.lat + ";" + from.lng
			    + "/" + to.lat + ";" + to.lng)
	    .respond(201, data);
	serleenaDataService.getPaths(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('Hokuto Road');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong getPaths', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;

	httpBackend.whenGET(BACKEND_URL + "/paths/" + from.lat + ";" + from.lng
			    + "/" + to.lat + ";" + to.lng)
	    .respond(404, 'error');
	serleenaDataService.getPaths(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });

    it('Successfully getPOIs', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;
	var data = [{
	    name: 'Hokuto Temple'
	}];

	httpBackend.whenGET(BACKEND_URL + "/poi/" + from.lat + "," + from.lng
			    + "/" + to.lat + "," + to.lng)
	    .respond(201, data);
	serleenaDataService.getPOIs(from, to, callback);
	httpBackend.flush();

	expect(dataReceived[0].name).toBe('Hokuto Temple');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong getPOis', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;

	httpBackend.whenGET(BACKEND_URL + "/poi/" + from.lat + "," + from.lng
			    + "/" + to.lat + "," + to.lng)
	    .respond(404, 'error');
	serleenaDataService.getPOIs(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });
});
