/**
 * Name: app.js
 * Package: App
 * Author: Antonio Cavestro
 *
 * History:
 * Version    Programmer  		Changes
 * 1.0.0      Antonio Cavestro 	Crea file
 *
 */

/**
 * @namespace App
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
