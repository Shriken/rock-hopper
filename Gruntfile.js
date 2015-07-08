module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
		},

		browserify: {
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

	grunt.registerTask('default', ['shell']);
};
