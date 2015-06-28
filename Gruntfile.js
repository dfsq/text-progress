'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 9999,
					keepalive: true
				}
			}
		},

		clean: {
			pre: ['dist'],
			deploy: ['tmp']
		},

		copy: {
			deploy: {
				files: [
					{
						expand: true,
						cwd: './demo',
						src: './**/*',
						dest: 'tmp'
					},
					{src: 'README.md', dest: 'tmp/README.md'},
					{expand: true, flatten: true, src: ['dist/*'], dest: 'tmp/'}
				]
			}
		},

		cssmin: {
			target: {
				files: {
					'dist/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.css'
				}
			}
		},

		uglify: {
			build: {
				options: {
					mangle: false,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM") %> */\n'
				},
				files: {
					'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
				}
			}
		},

		usemin: {
			html: ['tmp/index.html']
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			},
			dist: {
				configFile: 'karma.dist.conf.js'
			}
		},

		ghDeploy: {
			options: {
				repository: '<%= pkg.repository.url %>',
				deployPath: 'tmp'
			}
		}
	});

	grunt.registerTask('build', [
		//'karma:unit',
		'clean:pre',
		'cssmin',
		'uglify'
	]);

	grunt.registerTask('deploy', function() {
		grunt.task.run('clean:deploy');
		grunt.task.run('build');
		grunt.task.run('copy');
		//grunt.task.run('karma:dist');
		grunt.task.run('usemin');
		grunt.task.run('ghDeploy');
		grunt.task.run('clean:deploy');
	});

	grunt.registerTask('server', ['connect']);

	grunt.registerTask('test', ['karma:unit']);

	grunt.registerTask('default', ['server']);

};
