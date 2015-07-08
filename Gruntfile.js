module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			script: {
				files: ['src/**/*.js'],
				tasks: ['browserify'],
			}
		},

		browserify: {
			dist: {
				files: {
					'build/module.js': [
						'src/main.js',
					]
				}
			},
		},

		concurrent: {
			main: ['watch', 'shell']
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

	grunt.registerTask('watch', 'watch');
	grunt.registerTask('default', ['browserify', 'concurrent:main']);
};