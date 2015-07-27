module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			client: {
				files: [
					'client/**.js',
				],
				tasks: ['browserify'],
				options: {
					interrupt: true,
				},
			}
		},

		browserify: {
			dist: {
				options: {
					transform: [['babelify', { stage: 0 }]]
				},
				files: {
					'public/application.js': [
						'client/main.js',
					]
				}
			},
		},

		concurrent: {
			options: {
				logConcurrentOutput: true,
			},
			main: ['watch', 'nodemon'],
		},

		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					watch: ['server'],
				},
			},
		},
	});

	grunt.registerTask('default', ['browserify', 'concurrent']);
};
