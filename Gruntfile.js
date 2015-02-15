/**
 * nb-svg
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license http://www.gnu.org/licenses/agpl-3.0.txt AGPLv3
 */

module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: pkg,
		meta: {
			banner: ['/*',
				' * <%= pkg.name %>',
				' * <%= pkg.homepage %>',
				' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>',
				' * @copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>',
				' * @license <%= pkg.license.url %> <%= pkg.license.type %>',
				' */\n'].join('\n')
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: ['Gruntfile.js', 'tasks/**/*.js', 'tests/tests/*.js', 'src/**/*.js', 'demo/**/*.js']
		},
		clean: {
			init: ['build', 'dist'],
			exit: ['build'],
		},
		concat: {
			dist: {
				src: ['src/js/**/*.js', '!src/js/<%= pkg.name %>-templates.js', 'build/js/<%= pkg.name %>-templates.js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: ['dist/js/<%= pkg.name %>.js'],
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.registerTask('default', [
		'jshint',
		'clean:init',
		'concat',
		'uglify',
		'clean:exit',
	]);

};