var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.DataCollector = (function ($) {

  'use strict';

  function normalize(string) {
    return string.split(/,/);
  }


  var $target = $('#greenhopper-agile-issue-web-panel dd'),

    module = {
      STORAGE_KEY: 'jira-collaborators',

      observers: [],

      data: {},

      subscribe: function (subscriber) {
        this.observers.push(subscriber);
      },

      unsubscribe: function (subscriber) {
        var index = this.observer.indexOf(subscriber);
        if (index >= 0) {
          this.observers.splice(index);
        }
      },

      update: function (options) {
        this.data = $.extend(this.data, options || {});

        this.observers.forEach(function (observer) {
          observer.update();
        });
      },

      addCollaborators: function () {
        var collaborators = localStorage.getItem(module.STORAGE_KEY) || '';
        collaborators = window.prompt('Please enter your collaborators!\nNote: Separate the names with a comma e.g. "Jeffrey, Walter"', collaborators || '');
        localStorage.setItem(this.STORAGE_KEY, collaborators);
        this.update({collaborators: normalize(collaborators)});
      },

      getCollaborators: function () {
        var collaborators = localStorage.getItem(module.STORAGE_KEY) || '';
        return normalize(collaborators);
      }
    }
  ;


  module.update({
    number:        $('#key-val').text() || '',
    description:   $('#description-val').text() || '',
    dueDate:       $('#due-date time').text() || '',
    collaborators: module.getCollaborators(),
    type:          $('#type-val img').attr('alt') || '',
    reporter:      $('#reporter-val span').text() || '',
    created:       $('#create-datetime').text() || '',
    title:         $('#summary-val a').text() || '',
    component:     $('#components-field').text() || '',
    target:        $target[0] ? $target.text().trimWhitespace() : ''
  });

  return module;

}(jQuery));
