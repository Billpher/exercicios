module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                files: {
                    'dev/styles/layout.css': 'src/styles/main.less'
                }
            },
            dist: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/layout.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:dev']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    colapseWhitespace: true
                },
                files: {
                    'pre/index.html': 'src/index.html'
                }
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECODOCSS',
                            replacement: './styles/layout.css'
                        },
                        {
                            match: 'ENDERECODOJS',
                            replacement: './scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECODOCSS',
                            replacement: './styles/layout.min.css'
                        },
                        {
                            match: 'ENDERECODOJS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['pre/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        clean: ['pre'],
        uglify: {
            dev: {
                target: {
                    files: {
                        'dist/scripts/main.min.js': 'src/scripts/main.js'
                    }
                }
            },
            dist: {
                target: {
                    files: {
                        'dev/scripts/main.js': 'src/scripts/main.js'
                    }
                }
            }
        }
    }) 

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['uglify:dist', 'less:dist', 'htmlmin:dist', 'replace:dist', 'clean']);
}
