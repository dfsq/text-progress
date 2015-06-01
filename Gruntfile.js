'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-gh-deploy');

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

		uglify: {
			build: {
				options: {
					mangle: false,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM") %> */\n'
				},
				files: {
					'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js',
					'dist/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.css'
				}
			}
		},

		usemin: {
			html: ['demo/index.html']
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
				repository: '<%= pkg.repositiry.url %>',
				deployPath: 'demo'
			}
		}
	});

	grunt.registerTask('build', [
		//'karma:unit',
		'clean:pre',
		'uglify',
		'copy',
		'clean:post',
		//'usemin'
	]);

	grunt.registerTask('deploy', function() {
		grunt.task.run('build');
		grunt.task.run('karma:dist');
		grunt.task.run('clean:deploy');
		grunt.task.run('ghDeploy');
	});

	grunt.registerTask('server', ['connect']);

	grunt.registerTask('test', ['karma:unit']);

	grunt.registerTask('default', ['server']);

};
