module.exports = function(config){
    config.set({
      basePath : './',
      singleRun: true,

      files : [
        // file di Angular
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-mocks/angular-mocks.js',

        // file di serleena
        'dist/testangular.js',

        // test
        'test/unit/*.js'
      ],

      autoWatch : false,

      frameworks: ['jasmine'],

      browsers : ['PhantomJS'],

      reporters: ['junit'],
      junitReporter: {
        outputFile: 'test-results.xml'
      },

      preprocessors: {

      },

      plugins : [
          'karma-jasmine',
          'karma-phantomjs-launcher',
          'karma-junit-reporter'
      ]
})}
