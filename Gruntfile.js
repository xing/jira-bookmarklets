module.exports = function (grunt) {
  'use strict';

  grunt.file.mkdir('output');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'output/main.min.css': ['src/css/main.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['compressCSS', 'compressJS'],
        options: {
          spawn: false,
        }
      }
    },
    css: grunt.file.read('output/main.min.css'),
    uglify: {
      sdk: {
        options: {
          banner: 'javascript:(function(options){',
          footer: '}());',
        },
        files: {
          'output/sdk-loader.js': ['src/js/sdk/loader.js']
        }
      },
      printBookmarklet: {
        options: {
          banner: 'javascript:void(function(){',
          footer: "var xingJiraApp = new xing.jira.Application('<%= css %>');" +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.showPopup();' +
                  '})();'
        },
        files: {
          'output/ticket-print-bookmarklet.js': ['src/js/*.js']
        }
      },
      addBookmarlet: {
        options: {
          banner: 'javascript:void(function(){',
          footer: 'var xingJiraApp = new xing.jira.Application();' +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.cacheTicketHandler();' +
                  '})();'
        },
        files: {
          'output/add-ticket-bookmarklet.js': ['src/js/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['cssmin', 'uglify']);
  grunt.registerTask('compressCSS', ['cssmin']);
  grunt.registerTask('compressJS', ['uglify']);

};
