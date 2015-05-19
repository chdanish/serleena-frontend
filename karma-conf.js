module.exports = function(config){
    config.set({
      basePath : './',
      singleRun: true,

      files : [
        // file di Angular
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-cookies/angular-cookies.js',    
        'bower_components/angular-mocks/angular-mocks.js',

        // file di serleena
        'dist/serleenafrontend.js',

        // test
        'test/unit/**/*.js'
      ],

      autoWatch : false,

      frameworks: ['jasmine'],

      browsers : ['PhantomJS'],

      reporters: ['progress', 'junit', 'coverage'],
      junitReporter: {
        outputFile: 'test-results.xml'
      },
      coverageReporter: {
        type : 'html',
        dir : 'coverage/'
      },

      preprocessors: {
        'dist/serleenafrontend.js': 'coverage'
      },

      plugins : [
          'karma-jasmine',
          'karma-phantomjs-launcher',
          'karma-junit-reporter',
          'karma-coverage'
      ]
})}
