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
 * Name: ExperienceDetailsTest
 * Package: Experience
 * Author: Antonio Cavestro <antonio.cavestro@gmail.com>
 *
 * History
 * Version    Programmer        Changes
 * 1.0.0      Antonio Cavestro    Crea file e test
 *
 */

describe('La pagina riguardati i dettagli di una esperienza', function () {

  it('dovrebbe aprirsi correttamente', function () {

    browser.get('#/dashboard');

    element.all(by.css('table a')).get(0).click();

  });

  it('dovrebbe visualizzare correttamente i POI', function () {

    var poi = element.all(
      by.repeater('p in experience.points_of_interest')
    );

    poi.count().then( function (amount) {
      expect(amount).toBe(1);
    });

  });

  it('dovrebbe visualizzare correttamente i punti utente', function () {

    var userpoints = element.all(
      by.repeater('p in experience.user_points')
    );

    userpoints.count().then( function (amount) {
      expect(amount).toBe(1);
    });

  });

  it('dovrebbe visualizzare correttamente i percorsi', function () {

    var tracks = element.all(
      by.repeater('t in experience.tracks')
    );

    tracks.count().then( function (amount) {
      expect(amount).toBe(1);
    });

  });

  it('dovrebbe visualizzare correttamente i checkpoint di un percorso',
    function () {

      element(by.css('#panel-details-tracks .btn-primary')).click();

      var checkpoints = element.all(
        by.repeater('c in experience.tracks[currentTrackIndex].checkpoints')
      );

      checkpoints.count().then( function (amount) {
        expect(amount).toBe(2);
      });

  });

});
