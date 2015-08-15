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


describe('La pagina di creazione nuova esperienza', function () {

  it('dovrebbe permettere inserire un nome per l\'esperienza', function () {

    browser.get('#/dashboard/experiences/new');

    element(by.css('input[type=text][placeholder=Esperienza]')).isDisplayed()
      .then( function (isReally) {
        expect(isReally).toBe(true);
    });

    element(by.css('input[type=text][placeholder=Esperienza]')).sendKeys(
      browser.params.experience.name
    );

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe permettere di selezionare il perimetro', function () {

    element(by.css('#map-wizard')).isDisplayed().then( function (isReally) {
        expect(isReally).toBe(true);
      });

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe permettere di creare un percorso', function () {

    element.all(by.buttonText('Aggiungi nuovo')).get(0).click();


    // Mi rendo conto dell'assurdità di questo sistema, ma è l'unico modo
    // realmente cross-platform. A.

    for(var i = 0; i < 14; i++)
      element(by.model('track.name')).sendKeys(protractor.Key.BACK_SPACE);

    element(by.model('track.name')).sendKeys(
      browser.params.experience.track.name,
      protractor.Key.ENTER
    );

    element(by.buttonText('Checkpoint')).click();

    element.all(by.buttonText('Aggiungi nuovo')).get(1).click();
    element.all(by.buttonText('Aggiungi nuovo')).get(1).click();

    var checkpointList = element.all(
      by.repeater('point in tracks[currentTrackIndex].checkMarkers')
    );

    checkpointList.count().then( function (amount) {
      expect(amount).toBe(2);
    });

    element.all(by.buttonText('Salva')).get(0).click();

    var trackList = element.all(
      by.repeater('track in tracks')
    );

    trackList.count().then( function (amount) {
      expect(amount).toBe(1);
    });

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe permettere di aggiungere punti d\'interesse', function () {

    element.all(by.css('input[type=checkbox')).get(1).click();

    element.all(by.css('input[type=checkbox')).get(1).isSelected().then(
      function (selected) {
        expect(selected).toBe(true);
      }
    );

    element(by.buttonText('Avanti')).click();

  });

  it('dovrebbe permettere di aggiungere punti utente', function () {

    element(by.css('#panel-custompoints'))
      .element(by.buttonText('Aggiungi nuovo'))
      .click();

    element.all(by.repeater('point in customPoints')).count().then(
      function (amount) {
        expect(amount).toBe(1);
      }
    );

  });

  it('dovrebbe permettere di salvare l\'esperienza', function () {

    element(by.css('.wizard-complete')).click();

    element(by.css('.panel-success')).isDisplayed().then( function (isReally) {
      expect(isReally).toBe(true);
    });
  });

});
