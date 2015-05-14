module.exports = function(grunt){

    var serleenafrontend_files = [
	        './app/config/app.js',
	        './app/map/map.provider.js',
	        './app/config/appconfiguration.js',
	        './app/config/appinit.js',
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
		watch: {
			angular: {
				files: serleenafrontend_files,
				tasks: ['concat:angular', 'jshint:angular', 'notify:concat',
						'shell:docs'],
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

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat:angular', 'jshint:angular']);
    grunt.registerTask('deploy', ['zip:deploy']);
    grunt.registerTask('coverage', ['zip:coverage']);
    grunt.registerTask('docs', ['shell:docs', 'zip:docs']);

};
