'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		banner: '/**\n' +
				' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        		' * @desciption <%= pkg.description %>\n' +
        		' * @copyright <%= pkg.author %>.\n' +
        		' * @licence MIT.\n' +
        		' */',

		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [
						'dist/<%= pkg.name %>.js',
						'dist/<%= pkg.name %>.min.js',
						'dist/<%= pkg.name %>.css',
						'dist/<%= pkg.name %>.min.css'
					]
				}
			}
		},

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
			},
			build: {
				files: [
					{src: 'src/<%= pkg.name %>.js', dest: 'dist/<%= pkg.name %>.js'},
					{src: 'src/<%= pkg.name %>.css', dest: 'dist/<%= pkg.name %>.css'}
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
					mangle: false
				},
				files: {
					'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
				}
			}
		},

		usemin: {
			html: ['tmp/index.html']
		},

		mocha: {
			test: {
				src: ['test/index.html'],
				options: {
					log: true,
					reporter: 'Spec',
					run: true
				}
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
		'mocha:test',
		'clean:pre',
		'copy:build',
		'cssmin',
		'uglify',
		'usebanner:dist'
	]);

	grunt.registerTask('deploy', function() {
		grunt.task.run('clean:deploy');
		grunt.task.run('build');
		grunt.task.run('copy');
		//grunt.task.run('mocha:dist');
		grunt.task.run('usemin');
		grunt.task.run('ghDeploy');
		grunt.task.run('clean:deploy');
	});

	grunt.registerTask('server', ['connect']);

	grunt.registerTask('test', ['mocha:test']);

	grunt.registerTask('default', ['server']);

};
