var xing = xing || {};
xing.jira = xing.jira || {};

/**
 * @module xing.jira
 * @class TableData
 * @requires I18n
 */
xing.jira.TableData = function () {
  'use strict';

  var MAX_COLS = 5,
    local = (new xing.jira.I18n()).local().ticket
  ;

  this.get = function (data) {
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
            title: { text: local.type.title },
            body: {
              options: { cssClass: 'gm-label gm-label-' + data.typeSelector },
              text: data.type
            }
          }
        }, {
          cell: {
            title: { text: local.component.title },
            body: { text: data.component }
          }
        }, {
          cell: {
            title: { text: local.target.title },
            body: { text: data.target }
          }
        }
      ], [
        {
          head: true,
          cell: {
            options: { colspan: MAX_COLS, cssClass: 'gm-title gm-ltr' },
            body: {
              text: data.title,
              options: { cssClass: 'h2 gm-hyphen' }
            }
          }
        }
      ], [
        {
          cell: {
            options: {colspan: MAX_COLS, cssClass: 'gm-pairing'},
            title: {
              text: local.collaborator.title,
              options: { cssClass: 'gm-snap-left h5' }
            },
            body: {
              text: data.collaborators + local.collaborator.action,
              options: { cssClass: 'h5' }
            }
          }
        }
      ], [
        {
          cell: {
            title: { text: local.created.title },
            body: { text: data.created }
          }
        }, {
          cell: {
            title: { text: local.dueDate.title },
            body: {
              options: {
                cssClass: (data.dueDate ? 'gm-label-danger gm-label' : '')
              },
              text: data.dueDate
            }
          }
        }, {
          cell: {
            title: { text: local.reporter.title },
            body:  { text: data.reporter }
          }
        }, {
          cell: {
            options: { cssClass: 'gm-date-content gm-20' },
            title: { text: local.start.title },
            body: { text: local.start.body }
          }
        }, {
          cell: {
            options: { cssClass: 'gm-date-content gm-20' },
            title: { text: local.closed.title },
            body: { text: local.closed.body }
          }
        }
      ]
    ];
  };

};
