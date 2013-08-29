var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.tableFormat = function (data) {

  'use strict';

  var MAX_COLS = 5;

  return [
    [
      {
        head: true,
        cell: {
          options: {
            colspan: 2,
            cssClass: 'gm-number gm-ltr'
          },
          body: {
            text: data.number,
            options: { cssClass: 'h1', title: data.number }
          }
        }
      }, {
        cell: {
          title: { text: 'Type' },
          body: {
            options: { cssClass: 'gm-label gm-label-' + data.type.trimToCSSSelector() },
            text: data.type
          }
        }
      }, {
        cell: {
          title: { text: 'Component' },
          body: { text: data.component }
        }
      }, {
        cell: {
          title: { text: 'Target' },
          body: { text: data.target }
        }
      }
    ], [
      {
        head: true,
        cell: {
          options: { colspan: MAX_COLS, cssClass: 'gm-title gm-ltr' },
          body: {
            text: data.title.truncate(220),
            options: { cssClass: 'h2 gm-hyphen' }
          }
        }
      }
    ], [
      {
        cell: {
          options: {colspan: MAX_COLS, cssClass: 'gm-pairing'},
          title: {
            text: 'Pairing',
            options: { cssClass: 'gm-snap-left h5' }
          },
          body: {
            text: data.collaborators.join(' ') + '<button id="gm-add-collaborator" class="aui-button gm-snap-right"><i>+</i> Add Collaborators</button>',
            options: { cssClass: 'h5' }
          }
        }
      }
    ], [
      {
        cell: {
          title: { text: 'Created' },
          body: { text: data.created }
        }
      }, {
        cell: {
          title: { text: 'Due date' },
          body: {
            options: { cssClass: (data.dueDate ? 'gm-label-danger gm-label' : '') },
            text: data.dueDate
          }
        }
      }, {
        cell: {
          title: { text: 'Reporter' },
          body:  { text: data.reporter }
        }
      }, {
        cell: {
          options: { cssClass: 'gm-date-content gm-20' },
          title: { text: 'Start Progress' },
          body: { text: 'Day | Time' }
        }
      }, {
        cell: {
          options: { cssClass: 'gm-date-content gm-20' },
          title: { text: 'End date' },
          body: { text: 'Day | Time' }
        }
      }
    ]
  ];

};
