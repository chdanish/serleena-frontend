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


module.exports = function(grunt){

    var serleenafrontend_files = [
	        './app/app/app.js',
	        './app/map/map.provider.js',
	        './app/app/appconfiguration.js',
	        './app/app/appinit.js',
	        './app/authentication/*.js',
	        './app/map/map.directive.js',
	        './app/map/googlemaps.service.js',
	        './app/map/serleenadata.service.js',
	        './app/wizard/*.js',
	        './app/experience/*.js',
	        './app/synchronization/*.js',
	        './app/telemetry/*.js',
	];

	grunt.initConfig({

		concat: {
			options: {
				separator: ';',
			},
			angular: {
				src: serleenafrontend_files,
				dest: './dist/serleenafrontend.js',
			}
		},
		jshint: {
			angular: {
				src: serleenafrontend_files
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			frontend: {
				files: {
				  './dist/serleenafrontend.js': './dist/serleenafrontend.js',
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma-conf.js',
				background: true,
				singleRun: false
			},
			continuous: {
				configFile: 'karma-conf.js',
				singleRun: true
			}
		},
		watch: {
			angular: {
				files: serleenafrontend_files,
				tasks: ['concat:angular', 'jshint:angular', 'shell:docs',
					'karma:unit:run', 'notify:concat'],
				options: {
					livereload: true
				}
			}
		},
		zip: {
			deploy: {
				src: [
					'bower_components/angular/angular.js',
					'bower_components/angular-route/angular-route.js',
					'bower_components/angular-cookies/angular-cookies.js',
					'bower_components/bootstrap/dist/css/bootstrap.css',
					'bower_components/c3/c3.css',
					'bower_components/angular-chart/css/angular-chart.css',
					'bower_components/d3/d3.js',
					'bower_components/c3/c3.js',
					'bower_components/angular-chart/angular-chart.js',
					'bower_components/angular-socialshare/dist/angular-socialshare.min.js',
					'app/**',
					'assets/**',
					'dist/serleenafrontend.js',
					'index.html',
				],
				dest: './serleena-frontend.zip'
			},
			coverage: {
				src: ['coverage/**'],
				dest: './coverage.zip'
			},
			docs: {
				src: ['docs/**'],
				dest: './docs.zip'
			}
		},
		shell: {
			docs: {
				command: 'node node_modules/jsdoc/jsdoc.js -p app/**/*.js -d docs/',
			}
		},
		notify: {
			concat: {
				options: {
					title: "Esito compilazione",
					message: "Tutto ben, daghene"
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat:angular', 'jshint:angular']);
    grunt.registerTask('test', ['karma:continuous']);
    grunt.registerTask('deploy', ['zip:deploy']);
    grunt.registerTask('coverage', ['zip:coverage']);
    grunt.registerTask('docs', ['shell:docs', 'zip:docs']);
    grunt.registerTask('test', ['karma:continuous']);

};
