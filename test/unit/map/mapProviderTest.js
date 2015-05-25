/**
  * Name: MapProviderTest
  * Package: Map
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per MapProvider
  *
  */

var invoked;

describe('MapProvider Test', function () {
    var mapProvider;
    
    beforeEach(module('map', function (MapProvider) {
	mapProvider = MapProvider;
    }));
	       
    beforeEach(function() {
	invoked = false;
    });

    it('Successfully invoked', inject(function () {
	expect(invoked).toBe(false);
	
	mapProvider.$get();

	expect(invoked).toBe(true);
    }));

    it('Not invoked', inject(function () {
	expect(invoked).toBe(false);
	
	mapProvider.setMapType('OSM');
	mapProvider.$get();
	
	expect(invoked).toBe(false);
    }));
});

function GoogleMapsService () {
    invoked = true;
}
