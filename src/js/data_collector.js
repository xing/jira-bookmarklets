var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.DataCollector = (function ($, undefined) {

  'use strict';

  // @private

  function normalize(string) {
    return string.split(/,/);
  }

  function _getStoredTicketsArray() {
    var storedTickets = localStorage.getItem(module.TICKET_KEY),
      tickets = storedTickets && storedTickets[0] ? JSON.parse(storedTickets) : []
    ;
    return tickets;
  }

  // @public

  var $target = $('#greenhopper-agile-issue-web-panel dd a'),
    hostname = location.hostname,
    module = {
      COLLABORATOR_KEY: hostname + '.collaborators',
      TICKET_KEY: hostname + 'ticket',

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

      storeTicket: function (markup) {
        var storedTickets = _getStoredTicketsArray(),
          tickets = storedTickets.concat([markup])
        ;
        localStorage.setItem(module.TICKET_KEY, JSON.stringify(tickets));
      },

      getStoredTickets: function () {
        return _getStoredTicketsArray();
      },

      removeStoredTickets: function (itemNumber) {
        if (itemNumber !== undefined) {
          var storedTickets = _getStoredTicketsArray();
          if (storedTickets[0]) {
            storedTickets.splice(itemNumber, 1);
            localStorage.setItem(module.TICKET_KEY, JSON.stringify(storedTickets));
          }
        } else {
          localStorage.removeItem(module.TICKET_KEY);
        }
        return _getStoredTicketsArray();
      },

      addCollaborators: function () {
        var collaborators = localStorage.getItem(module.COLLABORATOR_KEY) || '',
          updatedCollaborators = window.prompt('Please enter your collaborators!\nNote: Separate the names with a comma e.g. "Jeffrey, Walter"', collaborators || '')
        ;
        if (!!updatedCollaborators && collaborators !== updatedCollaborators) {
          localStorage.setItem(this.COLLABORATOR_KEY, updatedCollaborators);
          this.update({collaborators: normalize(updatedCollaborators)});
        }
      },

      getCollaborators: function () {
        var collaborators = localStorage.getItem(module.COLLABORATOR_KEY) || '';
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
      }

    }
  ;

  module.update({
    number:        $('#key-val').text() || '',
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
