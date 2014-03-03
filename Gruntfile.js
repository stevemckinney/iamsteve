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
		grunticon: {
	    logo: {
        options: {
        	src: "src/assets/images/",
					dest: "site/assets/images/",
					svgo: true
				}
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
					config: 'src/assets/config.rb'
				}
			}
		},
		copy: {
		  main: {
		    expand: true,
		    cwd: 'src/',
		    src: '**',
		    dest: 'site/'
		  },
		},
		watch: {
			jekyll: {
				files: ['<%= pkg.path.src %>*.html'],
				tasks: ['jekyll:dev']
			},
			sass: {
        files: ['<%= pkg.path.sass %>*.scss', '<%= pkg.path.sass %>**/*.scss'],
        tasks: ['compass:dev'],
      },
      grunticon: {
        files: ['src/assets/images/', 'site/assets/images/'],
        tasks: ['grunticon'],
      },
		},
		jekyll: {
			server : {
				src : '<%= pkg.path.src %>',
				dest: '<%= pkg.path.dest %>',
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-grunticon');
	
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	// Tasks
	grunt.registerTask('default', ['watch', 'copy', 'compass:dev']);
	grunt.registerTask('build', ['copy', 'compass:dev', 'grunticon', 'watch']);
	
	grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};