module.exports = function(grunt) {

    grunt.initConfig({
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'www/js/app.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    watch: ['server.js', 'app/']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['www/js/app.js', 'www/js/controllers/*.js', 'www/js/services/*.js'],
                dest: 'www/js/app.build.js'
            }
        },
        watch: {
            files: ['<%= concat.dist.src %>'],
            tasks: ['concat', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify', 'concurrent:target']);
    // grunt.registerTask('default', ['watch', 'concat', 'nodemon']);

};
