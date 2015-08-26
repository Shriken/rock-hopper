module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			client: {
				files: [
					'client/**.js',
					'client.js',
				],
				tasks: ['browserify:client'],
				options: {
					interrupt: true,
				},
			},

			server: {
				files: [
					'server.js',
					'server/**.js',
				],
				tasks: ['clear', 'build:server'],
				options: {
					interrupt: true,
				},
			},
		},

		browserify: {
			client: {
				options: {
					transform: [['babelify', { stage: 0 }]]
				},
				files: {
					'public/application.js': [
						'client.js',
					]
				}
			},
		},

		babel: {
			server: {
				files: [{
					expand: true,
					cwd: 'server/',
					src: ['./**.js'],
					dest: 'server_build/',
					ext: '.js'
				}]
			},
		},

		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 4,
			},
			main: ['watch:server', 'watch:client', 'nodemon:server'],
		},

		nodemon: {
			server: {
				script: 'server.js',
				options: {
					watch: ['server.js', 'server_build'],
				},
			},
		},
		
		clean: {
			server: ['./server_build'],
		},
	});

	grunt.registerTask('build:server', [
		'clean:server',
		'babel:server',
	]);

	grunt.registerTask('default', [
		'browserify:client',
		'build:server',
		'concurrent',
	]);
};
