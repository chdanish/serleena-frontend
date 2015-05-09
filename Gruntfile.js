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
	        './app/**/*.js'
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
		watch: {
			angular: {
				files: serleenafrontend_files,
				//tasks: ['concat:angular','uglify:frontend'],
				tasks: ['concat:angular', 'jshint:angular', 'notify:concat'],
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
					'bower_components/bootstrap/dist/css/bootstrap.css',
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

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat:angular', 'jshint:angular']);
    grunt.registerTask('deploy', ['zip:deploy']);
    grunt.registerTask('coverage', ['zip:coverage']);

};
