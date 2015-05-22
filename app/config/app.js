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
 * Name: app.js
 * Package: App
 * Author: Antonio Cavestro
 *
 * History:
 * Version    Programmer  		Changes
 * 0.0.1      Antonio Cavestro 	2015-05-06  Crea file
 *
 */

/**
 * @namespace Authentication
 */
angular
        .module('authentication', ['ngCookies']);
/**
 * @namespace Experience
 */
angular
        .module('experience', ['wizard', 'map']);
/**
 * @namespace Map
 */
angular
        .module('map', []);
/**
 * @namespace Synchronization
 */
angular
        .module('synchronization', []);
/**
 * @namespace Telemetry
 */
angular
        .module('telemetry', ['angularChart', '720kb.socialshare']);
/**
 * @namespace Wizard
 */
angular
        .module('wizard', []);

angular
	.module('serleenaFrontend', [
		'ngRoute',
	        'authentication',
	        'experience',
	        'synchronization',
	        'telemetry',
	]).config(AppConfiguration)
	.run(AppInit);

angular.module('serleenaFrontend')
	.constant("DEBUG", false);

angular.module('serleenaFrontend')
	.constant("PRODUCTION_BACKEND_URL", 'http://api.hitchhikers.info');

angular.module('serleenaFrontend')
	.constant('DEVELOP_BACKEND_URL', "http://localhost:3000");

angular.module('serleenaFrontend')
	.value('BACKEND_URL', "");
