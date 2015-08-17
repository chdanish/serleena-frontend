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


describe('La pagina della lista di sincronizzazione', function () {

  it('dovrebbe visualizzare l\'esperienza creata', function () {

    browser.get('#/dashboard/sync');

    var expList = element.all(
      by.repeater('e in experiences')
    );

    expList.count().then( function (amount) {
      expect(amount).toBe(1);
    });

    expect(element.all(by.css('td')).get(1).getText())
      .toBe(browser.params.experience.name);

    element(by.css('input[type=checkbox]')).isSelected()
      .then( function (isReally) {
        expect(isReally).toBe(false);
      });

  });

  it('dovrebbe permettere di impostare un\'esperienza per la sincronizzazione',
    function () {

      element(by.css('input[type=checkbox]')).click();

      element(by.css('input[type=checkbox]')).isSelected()
        .then( function (isReally) {
          expect(isReally).toBe(true);
        });

      element(by.buttonText('Salva')).click();

      browser.get('#/dashboard/sync');

      element(by.css('input[type=checkbox]')).isSelected()
        .then( function (isReally) {
          expect(isReally).toBe(true);
        });

    });

});