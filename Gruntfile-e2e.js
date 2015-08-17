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


module.exports = function (grunt) {

  grunt.initConfig({
    http: {
      serleena_backend: {
        options: {
          url: 'http://api.hitchhikers.info/tokens/protractor_token'
        },
        dest: 'PROTRACTOR_TOKEN'
      }
    },
    clean: {
      coverageE2E: 'e2e/'
    },
    copy: {
      coverageE2E: {
        files: [{
          expand: true,
          dest: 'e2e/',
          src: [
            'bower_components/**/*',
            'assets/**/*',
            'dist/**/*',
            'app/**/*',
            'index.html'
          ]
        }]
      }
    },
    instrument: {
      files: 'dist/serleenafrontend.js',
      options: {
        lazy: false,
        basePath: 'e2e/'
      }
    },
    protractor_coverage: {
      options: {
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        coverageDir: 'e2e',
        args: {}
      },
      local: {
        options: {
          configFile: 'protractor-conf-local.js'
        }
      }
    },
    makeReport: {
      src: 'e2e/*.json',
      options: {
        type: 'html',
        dir: 'e2e/reports',
        print: 'detail'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-protractor-coverage');
  grunt.loadNpmTasks('grunt-http');

  grunt.registerTask('default', [
    'http',
    'clean:coverageE2E',
    'copy:coverageE2E',
    'instrument',
    'protractor_coverage:local',
    'makeReport'
  ]);

};