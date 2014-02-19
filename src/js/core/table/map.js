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
      ['number', 'type', 'component', 'storyPoints'],
      [ { 'title': { maxLength: 150 } } ],
      [ { 'description': { maxLength: 600 } } ]
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
 * @requires xing.core.table.layout
 * @param {xing.jira.TableMapCell} tableCell
 * @param {xing.core.I18n} local
 * @param {String} [layoutName]
 */
xing.core.table.Map = function (tableCell, local, layoutName) {
  'use strict';

  var scope = this,
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
      var item = map[index], result;

      if (typeof item === 'string') {
        result = tableCell[item]({data: data, local: local.ticket});
      }
      else if (xing.core.helpers.isObject(item)) {
        var itemName = Object.keys(item)[0];
        if (item[itemName].maxLength) {
          data[itemName] = data[itemName].truncate(item[itemName].maxLength);
        }
        result = tableCell[itemName]({data: data, local: local.ticket});
      }
      else {
        result = scope.build(data, item);
      }
      cellMap[index] = result;
    }

    return cellMap;
  };

};
