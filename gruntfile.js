module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['*.js'],
            options: {
                esversion: 6
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false,
                    noFile: false
                },
                src: ['test/**/*.js']
            }
        },
        browserify: {
            dist: {
                files: {
                    'gfs-checkout-helpers-browserify.js': ['gfs-checkout-helpers.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['gfs-checkout-helpers.js'],
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'mochaTest', 'browserify', 'watch']);

};