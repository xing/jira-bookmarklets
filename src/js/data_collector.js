var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.DataCollector = (function ($) {

  'use strict';

  function normalize(string) {
    return string.split(/,/);
  }


  var $target = $('#greenhopper-agile-issue-web-panel dd a'),

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
        var collaborators = localStorage.getItem(module.STORAGE_KEY) || '',
          updatedCollaborators = window.prompt('Please enter your collaborators!\nNote: Separate the names with a comma e.g. "Jeffrey, Walter"', collaborators || '')
        ;
        if (!!updatedCollaborators && collaborators !== updatedCollaborators) {
          localStorage.setItem(this.STORAGE_KEY, updatedCollaborators);
          this.update({collaborators: normalize(updatedCollaborators)});
        }
      },

      getCollaborators: function () {
        var collaborators = localStorage.getItem(module.STORAGE_KEY) || '';
        return normalize(collaborators);
      },

      getDate: function ($time) {
        var timeString = $time.attr('datetime'),
          date, m, Y, d, formattedDate
        ;
        if (timeString) {
          date = new Date(timeString);
          m = date.getMonth() + 1;
          m = m > 9 ? m : '0' + m;
          Y = date.getFullYear();
          d = date.getDate();
          formattedDate = (Y + '-' + m + '-' + d);

          return formattedDate;
        }

        return '';
      },

      getTicketNumber: function () {
        return ($('#key-val').text() || '').replace(/-/, '<br>');
      }

    }
  ;

  module.update({
    number:        module.getTicketNumber(),
    description:   $('#description-val').text() || '',
    dueDate:       module.getDate($('#due-date time')),
    collaborators: module.getCollaborators(),
    type:          $('#type-val img').attr('alt') || '',
    reporter:      $('#reporter-val span').text() || '',
    created:       module.getDate($('#create-date time')),
    title:         $('#summary-val').text() || '',
    component:     $('#components-field').text() || '',
    target:        $target[0] ? $target.text().trimWhitespace() : ''
  });

  return module;

}(jQuery));
