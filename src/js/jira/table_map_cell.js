Namespace.create('xing.jira');

/**
 * @module xing.jira.TableMapCell
 * @requires xing.jira.helpers.Label
 * @class TableMapCell
 */
xing.jira.TableMapCell = function () {
  'use strict';

  var scope = this,
      MAX_COLS = 5
  ;

  scope.labelHelper = new xing.jira.helpers.Label();
  scope.PREFIX = 'gm-jira-';

  /**
   * @private
   * @method _titleBody
   * @return {Object} default title, body cell object
   */
  scope._titleBody = function (options, item) {
    return {
      cell: {
        options: { cssClass: scope.PREFIX + item },
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
          cssClass: scope.PREFIX + 'number'
        },
        body: {
          text: options.data.number,
          options: { title: options.data.number }
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
        options: { cssClass: scope.PREFIX + 'type' },
        title: { text: options.local.type.title },
        body: {
          options: {
            cssClass: scope.labelHelper.getSelector(options.data.typeSelector)
          },
          text: options.data.type
        }
      }
    };
  };

  /**
   * @method description
   * @see number
   */
  scope.description = function (options) {
    return {
      head: true,
      cell: {
        options: { colspan: MAX_COLS, cssClass: scope.PREFIX + 'description' },
        body: { text: options.data.description }
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
        options: { colspan: MAX_COLS, cssClass: scope.PREFIX + 'title' },
        body: { text: options.data.title }
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
        options: {colspan: MAX_COLS, cssClass: scope.PREFIX + 'pairing'},
        title: {
          text: options.local.collaborator.title
        },
        body: {
          text: options.data.collaborators + options.local.collaborator.action
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
   * @method dueDate
   * @see number
   */
  scope.dueDate = function (options) {
    return {
      cell: {
        title: { text: options.local.dueDate.title },
        body: {
          options: {
            cssClass: scope.labelHelper.getSelector(options.data.dueDate ? 'bug' : undefined)
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
        options: { cssClass: scope.PREFIX + 'story' },
        title: {
          text: options.local.storyPoints.title
        },
        body:  {
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
