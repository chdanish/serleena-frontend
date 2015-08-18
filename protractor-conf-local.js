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


var fs = require('fs');
var PROTRACTOR_TOKEN = fs.readFileSync('PROTRACTOR_TOKEN');

exports.config = {
  // QUESTO VA IMPOSTATO CORRETTAMENTE
  baseUrl: 'http://localhost/hh/serleena-frontend/e2e/',
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'test/system/registrationTest.js',
    'test/system/pairingTest.js',
    'test/system/logoutTest.js',
    'test/system/loginTest.js',
    'test/system/newExperienceTest.js',
    'test/system/nonEmptyExperienceListTest.js',
    'test/system/syncListTest.js',
    'test/system/experienceDetailsTest.js',
    'test/system/editExperienceTest.js',
    'test/system/deleteExperienceTest.js',
    'test/system/logoutTest.js',
    'test/system/passwordRecoveryTest.js'
  ],
  params: {
    login: {
      email: 'protractor@hitchhikers.info',
      password: 'password'
    },
    pair: {
      token: PROTRACTOR_TOKEN
    },
    experience: {
      name: 'Protractor\'s Experience',
      track: {
        name: 'Simple track'
      }
    }
  },
  onPrepare: function () {
    browser.driver.manage().deleteAllCookies();
  }
};