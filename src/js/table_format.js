var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.tableFormat = function (data) {

  'use strict';

  return [
    [
      {
        head: true,
        cell: {
          options: {cssClass: 'gm-number gm-center gm-20'},
          body: {
            text: data.number.replace(/-/, '<br>'),
            options: {cssClass: 'h1', title: data.number}
          }
        }
      }, {
        head: true,
        cell: {
          options: {colspan: 4, cssClass: 'gm-title'},
          body: {
            text: data.title.truncate(74),
            options: {cssClass: 'h2 gm-hyphen'}
          }
        }
      }
    ], [
      {
        cell: {
          options: {
            rowspan: 1,
            cssClass: (data.dueDate ? 'gm-warning' : '')
          },
          title: {
            text: 'Due date'
          },
          body: {
            options: {cssClass: 'h4'},
            text: data.dueDate
          }
        }
      }, {
        cell: {
          options: {colspan: 4, cssClass: 'gm-pairing'},
          title: {
            text: 'Pairing',
            options: {cssClass: 'gm-snap-left h5'}
          },
          body: {
            text: data.collaborators.join(' ') + '<button id="gm-add-collaborator">Add Collaborators</button>',
            options: {cssClass: 'gm-snap-left h5'}
          }
        }
      }
    ], [
      {
        cell: {
          title: {
            text: 'Type'
          },
          body: {
            text: data.type
          }
        }
      }, {
        cell: {
          options: {rowspan: 4, colspan: 4, cssClass: 'gm-desc gm-hyphen'}
        }
      }
    ], [
      {
        cell: {
          title: {
            text: 'Reporter'
          },
          body: {
            text: data.reporter
          }
        }
      }
    ], [
      {
        cell: {
          title: {
            text: 'Component'
          },
          body: {
            text: data.component
          }
        }
      }
    ], [
      {
        cell: {
          title: {
            text: 'Target'
          },
          body: {
            text: data.target
          }
        }
      }
    ], [
      {
        cell: {
          title: {
            text: 'Created'
          },
          body: {
            text: data.created
          }
        }
      }, {
        cell: {
          options: {cssClass: 'gm-date-content'},
          title: {
            text: 'Start Progress'
          },
          body: {
            text: 'Day | Time'
          }
        }
      }, {
        cell: {
          options: {cssClass: 'gm-date-content'},
          title: {
            text: 'End date'
          },
          body: {
            text: 'Day | Time'
          }
        }
      }, {
        cell: {
          options: {cssClass: 'gm-qa'},
          title: {
            text: 'QA passed'
          },
          body: {
            text: ''
          }
        }
      }, {
        cell: {
          title: {
            text: 'Release'
          }
        }
      }
    ]
  ];

};
