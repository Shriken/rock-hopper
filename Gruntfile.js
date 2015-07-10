module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			script: {
				files: ['src/**.js'],
				tasks: ['browserify'],
			}
		},

		browserify: {
			dist: {
				options: {
					transform: [['babelify', { stage: 0 }]]
				},
				files: {
					'build/module.js': [
						'src/main.js',
					]
				}
			},
		},

		concurrent: {
			options: {
				logConcurrentOutput: true,
			},
			main: ['watch', 'shell'],
		},

		shell: {
			options: {
				stderr: false
			},
			target: {
				command: 'echo "serving on port 8000" && python -m SimpleHTTPServer'
			}
		},
	});

	grunt.registerTask('default', ['browserify', 'concurrent']);
};
