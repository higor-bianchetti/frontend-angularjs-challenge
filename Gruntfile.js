module.exports = function(grunt) {
  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),

 	  concat: {
			options: {
				separator: ';'
			},
			dist: {
				files: {
					'build/strands/strands.json': ['app/strands/strands.json'],
					'build/partials.html': ['app/partials/*.html'],
					'build/popup.html': ['app/popup.html'],
				}
			}
 	 	},

		uglify: {
			my_target: {
			 files: {
				 'build/js/script.min.js': ['app/modules/*.js', 'app/services/*.js', 'app/controllers/*.js', 'app/filters/*.js', 'app/libs/*.js', 'app/directives/*.js']
			 }
		 }
		},

	 	cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'build/css/style.min.css': ['app/css/*.css']
				}
			}
		},

	 	processhtml: {
			options: {
			},
			dist: {
				files: {
					'build/index.html': ['app/index.html']
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['app/partials/*'],
						dest: 'build/partials', filter: 'isFile'
					},
				]
			}
		},

		connect: {
			dev: {
				options: {
					port: 9000,
					base: {
						path: 'app',
						options: {
							index: 'index.html',
							maxAge: 300000
						}
					}
				}
			},
		},

		open: {
			dev : {
				path: 'http://localhost:9000',
				app: 'Chrome'
			}
		},

		watch: {
			client: {
				files: ['app/**/*'],
				tasks:['concat', 'cssmin', 'copy', 'processhtml'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('build', ['concat', 'uglify', 'cssmin', 'copy', 'processhtml']);
	grunt.registerTask('dev', ['connect:dev', 'open:dev', 'watch:client']);
};
