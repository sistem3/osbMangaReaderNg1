'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    html2js: {
      options: {
        // custom options, see below
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'src/osbMangaReader.directive.tpl.js'
      }
    },
    concat: {
      build: {
        src: ['src/osbMangaReader.directive.tpl.js', 'src/osbMangaReader.directive.js'],
        dest: 'dist/osbMangaReader.js'
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'src/css/osbMangaReader.css': 'src/scss/osbMangaReader.scss'
        }
      }
    },
    watch: {
      templates: {
        files: ['src/**/*.html'],
        tasks: ['html2js'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('template', ['html2js']);
  grunt.registerTask('build', ['grunt-sass', 'grunt-html2js', 'concat']);
};