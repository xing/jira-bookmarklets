Namespace.create('xing.jira');

/**
 * @module xing.jira.TableMapCell
 * @class TableMapCell
 */
xing.jira.TableMapCell = function () {
  'use strict';

  var scope = this,
      MAX_COLS = 5
  ;

  /**
   * @private
   * @method _titleBody
   * @return {Object} default title, body cell object
   */
  scope._titleBody = function (options, item) {
    return {
      cell: {
        title: { text: options.local[item].title },
        body:  { text: options.data[item] }
      }
    };
  };

  /**
   * @method number
   * @param {Object} options Hash of all the ticket data
   *   @param {Object} options.data Hash of all the ticket data
   *   @param {Object} [options.local] I18n local texts
   */
  scope.number = function (options) {
    return {
      head: true,
      cell: {
        options: {
          colspan: 2,
          cssClass: 'gm-number gm-ltr'
        },
        body: {
          text: options.data.number,
          options: { cssClass: 'h1', title: options.data.number }
        }
      }
    };
  };

  /**
   * @method type
   * @see number
   */
  scope.type = function (options) {
    return {
      cell: {
        title: { text: options.local.type.title },
        body: {
          options: {
            cssClass: 'gm-label gm-label-' + options.data.typeSelector
          },
          text: options.data.type
        }
      }
    };
  };

  /**
   * @method component
   * @see number
   */
  scope.component = function (options) {
    return scope._titleBody(options, 'component');
  };

  /**
   * @method target
   * @see number
   */
  scope.target = function (options) {
    return scope._titleBody(options, 'target');
  };

  /**
   * @method title
   * @see number
   */
  scope.title = function (options) {
    return {
      head: true,
      cell: {
        options: { colspan: MAX_COLS, cssClass: 'gm-title gm-ltr' },
        body: {
          text: options.data.title,
          options: { cssClass: 'h2 gm-hyphen' }
        }
      }
    };
  };

  /**
   * @method collobarators
   * @see number
   */
  scope.collobarators = function (options) {
    return {
      cell: {
        options: {colspan: MAX_COLS, cssClass: 'gm-pairing'},
        title: {
          text: options.local.collaborator.title,
          options: { cssClass: 'gm-snap-left h5' }
        },
        body: {
          text: options.data.collaborators + options.local.collaborator.action,
          options: { cssClass: 'h5' }
        }
      }
    };
  };

  /**
   * @method created
   * @see number
   */
  scope.created = function (options) {
    return scope._titleBody(options, 'created');
  };

  /**
   * @method deuDate
   * @see number
   */
  scope.dueDate = function (options) {
    return {
      cell: {
        title: { text: options.local.dueDate.title },
        body: {
          options: {
            cssClass: (options.data.dueDate ? 'gm-label-danger gm-label' : '')
          },
          text: options.data.dueDate
        }
      }
    };
  };

  /**
   * @method reporter
   * @see number
   */
  scope.reporter = function (options) {
    return scope._titleBody(options, 'reporter');
  };

  /**
   * @method storyPoints
   * @see number
   */
  scope.storyPoints = function (options) {
    return {
      cell: {
        title: {
          options: { cssClass: 'gm-center' },
          text: options.local.storyPoints.title
        },
        body:  {
          options: { cssClass: 'gm-center h3'},
          text: options.data.storyPoints
        }
      }
    };
  };

  /**
   * @method start
   * @see number
   */
  scope.start = function (options) {
    return {
      cell: {
        options: { cssClass: 'gm-date-content gm-20' },
        title: { text: options.local.start.title },
        body: { text: options.local.start.body }
      }
    };
  };

  /**
   * @method closed
   * @see number
   */
  scope.closed = function (options) {
    return {
      cell: {
        options: { cssClass: 'gm-date-content gm-20' },
        title: { text: options.local.closed.title },
        body: { text: options.local.closed.body }
      }
    };
  };
};
