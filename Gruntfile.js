/*global module:false*/

module.exports = function(grunt) {
	'use strict';
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: ['<%= pkg.path.js %>lettering.js', 
							'<%= pkg.path.js %>fittext.js',
							'<%= pkg.path.js %>fitvids.js', 
							'<%= pkg.path.js %>prism.js',
							'<%= pkg.path.js %>global.js'],
				dest: '<%= pkg.path.js %><%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'<%= pkg.path.js %><%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint: {
			files: ['gruntfile.js', '<%= pkg.path.js %>*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		compass: {
			dev: {
				options: {
					config: '<%= pkg.path.assets %>config.rb'
				}
			}
		},
		watch: {
			jekyll: {
				files: ['<%= pkg.path.src %>*.html'],
				tasks: ['jekyll:dev']
			},
			sass: {
        files: ['<%= pkg.path.sass %>*.scss', '<%= pkg.path.sass %>**/*.scss'],
        tasks: ['compass:dev']
      }
		},
		jekyll: {
			server : {
				src : '<%= pkg.path.src %>',
				dest: '<%= pkg.path.dest %>',
				server : true,
				server_port : 8000,
				auto : true
			},
			dev: {
				src: '<%= pkg.path.src %>',
				dest: '<%= pkg.path.dest %>'
			},
			prod: {
				src: '<%= pkg.path.src %>',
				dest: '<%= pkg.path.dest %>'
			}
		},
		copy: {
		  main: {
		    src: '<%= pkg.path.src %>*',
		    dest: '<%= pkg.path.dest %>',
		  },
		},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jekyll');
	
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	// Static site use jekyll
	grunt.registerTask('default', ['watch', 'compass', 'jekyll']);
	
	// Nonstatic site use copy
	// grunt.registerTask('default', ['watch', 'compass', 'copy']);
	
	grunt.registerTask('dev', ['default']);

	grunt.registerTask('deploy', ['default', 'concat', 'jshint', 'uglify']);

};