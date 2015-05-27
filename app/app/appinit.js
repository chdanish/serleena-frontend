/**
 * Classe che contiene l'inizializzazione dell'applicazione, in particolare lo
 * stato di autenticazione e il gestore degli accessi nelle varie aree.
 *
 * @example Si occupa di inizializzare l'applicazione, in particolar modo la
 * gestione degli accessi, che impedisce agli utenti non autenticati l'accesso
 * all'area riservata.
 * @constructor
 * @param {Provider} $rootScope - ViewModel globale di AngularJS, usato per
 * impostare globalmente se l'utente è autenticato o meno.
 * @param {Provider} $location - Facade di AngularJS con il quale interagire
 * per gestire la history del browser e gli indirizzi.
 * @param {Service} AuthService - Gestore dell'autenticazione.
 * @memberOf App
 * @author Antonio Cavestro <antonio.cavestro@gmail.com>
 * @version 1.0
 */
function AppInit($rootScope, $location, AuthService){
	$rootScope.userLogged = AuthService.isLogged();
	/**
	 * Gestisce il controllo degli accessi nell'applicazione.
	 * @function accessManager
	 * @memberOf App.AppInit
	 * @instance
	 */
	var accessManager = function(){
		var userLoggedRedirectRoutes = {
			'/': '/dashboard'
		};
		var userForbiddenRoutes = {
			'/dashboard': '/'
		};
		var nextPath = $location.path();
		var redirect;

		if ($rootScope.userLogged){
			redirect = userLoggedRedirectRoutes[nextPath];
		} else {
			for(var before in userForbiddenRoutes){
				if(nextPath.indexOf(before) != -1){
					redirect = userForbiddenRoutes[before];
				}
			}
		}

		if (typeof redirect != 'undefined'){
			$location.path(redirect);
		}
	};

	$rootScope.$on('$routeChangeStart', accessManager);
}
