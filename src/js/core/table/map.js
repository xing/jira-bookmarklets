Namespace.create('xing.core.table');

/**
 * @module xing.jira.table
 * @class Layout
 * @type literal
 */
xing.core.table.layout = {

  /**
   * @type {Sting}
   * @property DEFAULT_LAYOUT
   * @static
   */
  DEFAULT_LAYOUT: 'default',

  /**
   * @type {String}
   * @property SCRUM_LAYOUT
   * @static
   */
  SCRUM_LAYOUT: 'scrum',

  /**
   * Basic layout types
   * @property _layouts
   */
  _layouts: {
    default: [
      ['number', 'type', 'component', 'target'],
      ['title'],
      ['collobarators'],
      ['created', 'dueDate', 'reporter', 'start', 'closed']
    ],
    scrum: [
      ['number', 'type', 'component', 'target'],
      ['title'],
      ['description'],
      ['collobarators'],
      ['created', 'dueDate', 'start', 'closed', 'storyPoints']
    ]
  },

  /**
   * @method get
   * @param {String} layoutName Is the name of layout
   * @return {Array} Multidimensiontion array with the table cell name in it.
   */
  get: function (layoutName) {
    'use strict';

    var result = this._layouts[layoutName];

    return result;
  }

};

/**
 * @module xing.jira.table
 * @class Map
 * @type function
 * @requires xing.core.I18n
 * @param {function} tableCell
 * @param {String} [layoutName]
 */
xing.core.table.Map = function (tableCell, layoutName) {
  'use strict';

  var scope = this,
      local = (new xing.core.I18n()).local().ticket,
      layout = xing.core.table.layout
  ;

  layoutName = layoutName || layout.DEFAULT_LAYOUT;

  /**
   * @method build
   * @param {Object} data
   * @param {Array} map Multidimensional array with string values
   */
  scope.build = function (data, map) {
    map = map || layout.get(layoutName);
    var cellMap = [],
        index = 0,
        length = map.length
    ;

    for (; index < length; index++) {
      var item = map[index];

      if (typeof item === 'string') {
        local = local;
        cellMap[index] = tableCell[item]({data: data, local: local});
      }
      else {
        cellMap[index] = scope.build(data, item);
      }
    }

    return cellMap;
  };

};
