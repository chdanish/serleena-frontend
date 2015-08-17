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


describe('La pagina di modifica di una esperienza', function () {

  it('dovrebbe aprirsi correttamente', function () {

    browser.get('#/dashboard');

    element(by.css('.btn-warning')).click();

  });

  it('dovrebbe aver caricato il nome', function () {

    browser.sleep(500);

    expect(element(by.css('#experience-name-input')).getAttribute('value'))
      .toBe(browser.params.experience.name);

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe segnalare il blocco del perimetro', function () {

    element(by.css('div.alert.alert-warning')).isDisplayed()
      .then( function (isReally) {
          expect(isReally).toBe(true);
      });

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe caricare i percorsi', function () {

    var tracks = element.all(
      by.repeater('track in tracks')
    );

    tracks.count().then( function (amount) {
      expect(amount).toBe(1);
    });

  });

  it('dovrebbe caricare i checkpoint di un percorso', function () {

    element(by.css('#panel-tracks .btn-primary')).click();

    var checkpoints = element.all(
      by.repeater('point in tracks[currentTrackIndex].checkMarkers')
    );

    checkpoints.count().then( function (amount) {
      expect(amount).toBe(2);
    });

  });

  it('dovrebbe permettere di cancellare un checkpoint', function () {

    element.all(by.css('#panel-checkpoints .btn-danger')).get(0).click();

    var checkpoints = element.all(
      by.repeater('point in tracks[currentTrackIndex].checkMarkers')
    );

    checkpoints.count().then( function (amount) {
      expect(amount).toBe(1);
    });

    element(by.css('#panel-checkpoints .btn-primary')).click();

  });

  it('dovrebbe permettere di cancellare un percorso', function () {

    element(by.css('#panel-tracks .btn-danger')).click();

    var tracks = element.all(
      by.repeater('track in tracks')
    );

    tracks.count().then( function (amount) {
      expect(amount).toBe(0);
    });

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe permettere di aggiungere un POI', function () {

    element.all(by.css('.poi-checkbox')).get(0).click();

    element.all(by.css('.poi-checkbox')).get(0).isSelected()
      .then( function (isReally) {
        expect(isReally).toBe(true);
      });

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe permettere di aggiungere un punto utente', function () {

    element(by.css('#panel-custompoints'))
      .element(by.buttonText('Aggiungi nuovo'))
      .click();

    var points = element.all(
      by.repeater('point in customPoints')
    );

    points.count().then( function (amount) {
      expect(amount).toBe(2);
    });

  });

  it('dovrebbe permettere di salvare l\'esperienza modificata', function () {

    element(by.css('.wizard-complete')).click();

    element(by.css('.panel-success')).isDisplayed().then( function (isReally) {
      expect(isReally).toBe(true);
    });

  });

});