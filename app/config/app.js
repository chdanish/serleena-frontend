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
angular
        .module('authentication', ['ngCookies']);
angular
        .module('experience', ['wizard']);
angular
        .module('map', []);
angular
        .module('synchronization', []);
angular
        .module('telemetry', []);
angular
        .module('wizard', []);

angular
	.module('serleenaFrontend', [
		'ngRoute',
	        'authentication',
	        'experience',
	        'map',
	        'synchronization',
	        'telemetry',
	]).config(AppConfiguration)
	.run(AppInit);

angular.module('serleenaFrontend')
	.value('BACKEND_URL', 'http://api.hitchhikers.info');
