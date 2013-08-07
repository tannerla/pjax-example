'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var dirsConfig = {
        app: 'app',
        public: 'app/public'
    };

    grunt.initConfig({
        dirs: dirsConfig,
        
        // see https://github.com/ericclemmons/grunt-express-server
        express: {
            options: {
                port: 3000
            },
            server: {
                options: {
                    script: '<%= dirs.app %>/app.js'
                }
            }
        },

        // see https://npmjs.org/package/grunt-contrib-watch
        watch: {
            options: {
                nospawn: true
            },

            express: {
                files: ['<%= dirs.public %>/*.*'],
                tasks:  [ 'express:server' ],
                options: {
                    nospawn: true
                }
            },
        },
        
        // see https://npmjs.org/package/grunt-open
        open: {
            server: {
                path: 'http://localhost:<%= express.options.port %>'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'express:server',
            'open',
            'watch'
        ]);
    });
};
