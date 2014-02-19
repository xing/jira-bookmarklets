module.exports = function (grunt) {
  'use strict';

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var appConfig = {
    src: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/namespace-js/src/namespace.js',
      'src/js/core/**/*.js',
      'src/js/jira/**/*.js'
    ],
    cssMin: {
      src: '',
      path: 'build/main.min.css',
      delay: 1000
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appConfig: appConfig,

    jasmine: {
      all: {
        src: appConfig.src,
        options: {
          helpers: 'test/spec/*_helper.js',
          specs: 'test/spec/**/*_spec.js',
          title: '<%= pkg.name %>'
        }
      }
    },

    watch: {
      options: {
        spawn: false
      },
      grunt: { files: ['Gruntfile.js'] },
      js: {
        files: ['src/js/**/*.js', 'test/spec/**/*.js'],
        tasks: ['jasmine']
      },
      sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/main.css': 'src/scss/main.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/main.min.css': 'src/scss/main.scss'
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
          footer: "var xingJiraApp = new xing.jira.Application('<%= appConfig.cssMin.src %>');" +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.showPopup();' +
                  '})();'
        },
        files: {
          'build/ticket-print-bookmarklet.js': appConfig.src
        }
      },
      printBookmarkletScrum: {
        options: {
          banner: 'javascript:void(function(){',
          footer: "var xingJiraApp = new xing.jira.Application(" +
                    "'<%= appConfig.cssMin.src %>', " +
                    '{ layoutName: xing.core.table.layout.SCRUM_LAYOUT }' +
                  ");" +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.showPopup();' +
                  '})();'
        },
        files: {
          'build/ticket-print-lay-scrum-bookmarklet.js': appConfig.src
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
          'build/add-ticket-bookmarklet.js': appConfig.src
        }
      },
      addBookmarletScrum: {
        options: {
          banner: 'javascript:void(function(){',
          footer: 'var xingJiraApp = new xing.jira.Application(' +
                    '"", ' +
                    '{ layoutName: xing.core.table.layout.SCRUM_LAYOUT }' +
                  ');' +
                  'xingJiraApp.versionTimestamp=' +
                    '"<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>";' +
                  'xingJiraApp.version="<%= pkg.version %>";' +
                  'xingJiraApp.cacheTicketHandler();' +
                  '})();'
        },
        files: {
          'build/add-ticket-lay-scrum-bookmarklet.js': appConfig.src
        }
      }
    }
  });

  grunt.registerTask('cssmin', 'Read CSS file async and cache the content', function () {
    var done = this.async(),
        config = appConfig.cssMin
    ;
    grunt.task.requires('sass:dist');
    setTimeout(function () {
      config.src = grunt.file.read(config.path).replace(/\n/g, '');
      done();
    }, config.delay);
  });

  grunt.registerTask('default', ['sass:dist', 'cssmin', 'uglify']);
  grunt.registerTask('test',    ['jasmine:all']);

};
