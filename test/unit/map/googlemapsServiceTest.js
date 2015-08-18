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
 * Name: GoogleMapsServiceTest
 * Package: Map
 * Author: Antonio Cavestro <antonio.cavestro@gmail.com>
 *
 * History
 * Version    Programmer        Changes
 * 1.0.0      Antonio Cavestro    Crea file e test per GoogleMapsService
 *
 */

describe('GoogleMapsService Test', function () {

  var googleMapsService = {};

  google = {
    maps: {
      Map: function () {
        return {
          map: true,
          fitBounds: function () {},
          getCenter: function () {}
        };
      },
      MapTypeId: {
        TERRAIN: 'TERRAIN'
      },
      LatLngBounds: function () {
        return {
          getCenter: function () {}
        }
      },
      LatLng: function () {
        return {};
      },
      Rectangle: function () {
        return {
          rectangle: true,
          edited: false,
          setOptions: function () {
            this.edited = true;
          },
          getBounds: function () {
            return {
              getNorthEast: function (){
                return {
                  lat: function () { return 123},
                  lng: function () { return 456}
                };
              },
              getSouthWest: function () {
                return {
                  lat: function () { return 123},
                  lng: function () { return 456}
                };
              }
            }
          }
        };
      },
      Polyline: function (obj) {
        var withIcons = obj.hasOwnProperty('icons');
        return {
          withIcons: withIcons,
          line: true
        };
      },
      Marker: function () {
        return {
          marker: true,
          getPosition: function () {
            return {
              lat: function () { return 123; },
              lng: function () { return 456; }
            }
          }
        };
      },
      SymbolPath: {
        CIRCLE: 'CIRCLE'
      }
    }
  };

  beforeEach(module('map'));

  beforeEach(inject( function (_GoogleMapsService_) {
    googleMapsService = _GoogleMapsService_;
  }));

  it('should successfully init a map', function () {

    var map = googleMapsService.initMap('#some-map');

    expect(map.map).toBe(true);

  });

  it('should successfully init a map from a perimeter', function () {

    var map = googleMapsService.initMapFromPerimeter(
      '#some-map',
      {lat: 123, lng: 456},
      {lat: 123, lng: 456}
    );

    expect(map.map).toBe(true);

  });

  it('should successfully draw a perimeter', function () {

    var rectangle = googleMapsService.drawPerimeter({});

    expect(rectangle.rectangle).toBe(true);

  });

  it('should successfully draw a perimeter from bounds', function () {

    var rectangle = googleMapsService.drawPerimeterFromBounds(
      {},
      {lat: 123, lng: 456},
      {lat: 123, lng: 456}
    );

    expect(rectangle.rectangle).toBe(true);

  });

  it('should successfully enable editing of a perimeter', function () {

    var rectangle = googleMapsService.drawPerimeter({});
    expect(rectangle.rectangle).toBe(true);

    googleMapsService.enablePerimeterEditing(rectangle);

    expect(rectangle.edited).toBe(true);

  });

  it('should successfully close a perimeter', function () {

    var map = googleMapsService.initMap('#some-map');
    expect(map.map).toBe(true);

    var rectangle = googleMapsService.drawPerimeter({});
    expect(rectangle.rectangle).toBe(true);

    var coords = googleMapsService.closePerimeter(map, rectangle);

    expect(rectangle.edited).toBe(true);
    expect(coords).toEqual({
      ne: {lat: 123, lng: 456},
      sw: {lat: 123, lng: 456}
    });

  });

  it('should successfully draw a POI', function () {

    var poi = googleMapsService.drawPOI();

    expect(poi.marker).toBe(true);

  });

  it('should successfully draw a checkpoint', function () {

    var map = googleMapsService.initMap('#some-map');
    expect(map.map).toBe(true);

    var checkpoint = googleMapsService.drawCheckpoint(map);

    expect(checkpoint.marker).toBe(true);

  });

  it('should successfully draw a checkpoint from a position', function () {

    var checkpoint = googleMapsService.drawCheckpointFromPosition();

    expect(checkpoint.marker).toBe(true);

  });

  it('should successfully create an editable checkpoint from a position',
    function () {

    var checkpoint = googleMapsService.createEditableCheckpointFromPosition();

    expect(checkpoint.marker).toBe(true);

  });

  it('should successfully draw a checkpoint from a given object', function () {

    var setMap = false;

    var obj = {
      setMap: function(map) {
        setMap = map.setMap;
      }
    };

    googleMapsService.drawCheckpointFromObject({setMap: true}, obj);

    expect(setMap).toBe(true);

  });

  it('should successfully draw a custom point from a position',
    function () {

      var userpoint = googleMapsService.drawCustomPointFromPosition();

      expect(userpoint.marker).toBe(true);

    });

  it('should successfully draw an editable custom point from a position',
    function () {

      var userpoint = googleMapsService.drawEditableCustomPointFromPosition();

      expect(userpoint.marker).toBe(true);

    });

  it('should successfully get the position of a checkpoint', function () {

    var map = googleMapsService.initMap('#some-map');
    expect(map.map).toBe(true);

    var checkpoint = googleMapsService.drawCheckpoint(map);

    expect(checkpoint.marker).toBe(true);

    var p = googleMapsService.getCheckpointPosition(checkpoint);

    expect(p).toEqual({ lat: 123, lng: 456 });

  });

  it('should successfully get the position of a custom point', function () {

    var map = googleMapsService.initMap('#some-map');
    expect(map.map).toBe(true);

    var userpoint = googleMapsService.drawCheckpoint(map);

    expect(userpoint.marker).toBe(true);

    var p = googleMapsService.getCheckpointPosition(userpoint);

    expect(p).toEqual({ lat: 123, lng: 456 });

  });

  it('should successfully draw a track', function () {

    var t = googleMapsService.drawTrack({}, []);

    expect(t.line).toBe(true);
    expect(t.withIcons).toBe(false);

  });

  it('should successfully remove a track from a map', function () {

    var removed = false;

    var obj = {
      setMap: function (m) {
        removed = m === null;
      }
    };

    googleMapsService.removeTrackFromMap(obj);

    expect(removed).toBe(true);

  });

  it('should successfully remove a checkpoint from a map', function () {

    var removed = false;

    var obj = {
      setMap: function (m) {
        removed = m === null;
      }
    };

    googleMapsService.removeCheckpointFromMap(obj);

    expect(removed).toBe(true);

  });

  it('should successfully remove a POI from a map', function () {

    var removed = false;

    var obj = {
      setMap: function (m) {
        removed = m === null;
      }
    };

    googleMapsService.removePOIFromMap(obj);

    expect(removed).toBe(true);

  });

  it('should successfully remove a custom point from a map', function () {

    var removed = false;

    var obj = {
      setMap: function (m) {
        removed = m === null;
      }
    };

    googleMapsService.removeCustomPointFromMap(obj);

    expect(removed).toBe(true);

  });

});
