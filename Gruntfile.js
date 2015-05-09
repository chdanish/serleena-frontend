module.exports = function(grunt){

    var serleenafrontend_files = [
	        './app/config/*.js',
	        './app/authentication/*.js',
	        './app/map/*.js',
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
