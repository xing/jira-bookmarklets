module.exports = function (grunt) {
  'use strict';

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var jiraConfig = {
    src: [
      'src/js/vendor/namespace.js',
      'src/js/core/**/*.js',
      'src/js/jira/**/*.js'
    ]
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      all: {
        src: jiraConfig.src,
        options: {
          helpers: 'test/spec/*_helper.js',
          specs: 'test/spec/*_spec.js',
          vendor: 'src/js/vendor/*.js',
          title: '<%= pkg.name %>'
        }
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/js/**/*.js', 'test/spec/**/*.js'],
        tasks: ['jshint', 'jasmine'],
        options: {
          spawn: false,
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'build/main.min.css': ['src/css/main.css']
        }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js',
        'src/js/core/**/*.js',
        'src/js/jira/**/*.js',
        'test/**/*.js'
      ],
      options: grunt.file.readJSON('.jshintrc')
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      strict: {
        src: ['src/css/*.css']
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src/js/',
          outdir: 'docs/'
        }
      }
    },
    css: grunt.file.read('build/main.min.css'),
    uglify: {
      sdk: {
        options: {
          banner: 'javascript:(function(options){',
          footer: '}());',
        },
        files: {
          'build/sdk-loader.js': ['src/js/sdk/loader.js']
        }
      },
      printBookmarklet: {
        options: {
          banner: 'javascript:void(function(){',
          footer: 'var xingJiraApp = new xing.jira.Application(' +
                    "'<%= css %>', " +
                  ');' +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.showPopup();' +
                  '})();'
        },
        files: {
          'build/ticket-print-bookmarklet.js': jiraConfig.src
        }
      },
      printBookmarkletScrum: {
        options: {
          banner: 'javascript:void(function(){',
          footer: 'var xingJiraApp = new xing.jira.Application(' +
                    "'<%= css %>', " +
                    'xing.core.table.layout.SCRUM_LAYOUT' +
                  ');' +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.showPopup();' +
                  '})();'
        },
        files: {
          'build/ticket-print-lay-scrum-bookmarklet.js': jiraConfig.src
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
          'build/add-ticket-bookmarklet.js': jiraConfig.src
        }
      },
      addBookmarletScrum: {
        options: {
          banner: 'javascript:void(function(){',
          footer: 'var xingJiraApp = new xing.jira.Application(' +
                    '"", ' +
                    'xing.core.table.layout.SCRUM_LAYOUT' +
                  ');' +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.cacheTicketHandler();' +
                  '})();'
        },
        files: {
          'build/add-ticket-lay-scrum-bookmarklet.js': jiraConfig.src
        }
      }
    }
  });

  grunt.registerTask('default', ['cssmin', 'uglify']);
  grunt.registerTask('compress', ['cssmin', 'uglify']);
  grunt.registerTask('compress:css', ['cssmin']);
  grunt.registerTask('compress:js', ['uglify']);

  grunt.registerTask('test', [
    'jasmine:all'
  ]);
};
