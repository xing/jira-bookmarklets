Namespace.create('xing.core.table');

/**
 * @module xing.core.table
 * @class layout
 * @for xing.core.table.Map
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
   * Available properties:
   * collaborators, component, created, description, dueDate, number, reporter, storyPoints, target, title, type,
   */
  _layouts: {
    default: [
      ['number', 'type', 'component', 'target'],
      [ { 'title': { maxLength: 350 } } ],
      ['collobarators'],
      ['created', 'dueDate', 'reporter', 'start', 'closed']
    ],
    scrum: [
      ['number', 'type', 'component', 'storyPoints'],
      [ { 'title': { maxLength: 87 } } ],
      ['description']
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
 * @module xing.core.table
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
   * Handle the different data types
   * @method _mapSwitch
   * @param {Object} data
   * @param {String|Array|Object} mapItem
   * @return {xing.jira.TableMapCell}
   */
  scope._mapSwitch = function (data, mapItem) {
    var result;

    if (typeof mapItem === 'string') {
      result = tableCell[mapItem]({data: data, local: local.ticket});
    }
    else if (xing.core.helpers.isObject(mapItem)) {
      var mapItemName = Object.keys(mapItem)[0];
      if (mapItem[mapItemName].maxLength) {
        data[mapItemName] = data[mapItemName].truncate(mapItem[mapItemName].maxLength);
      }
      result = tableCell[mapItemName]({data: data, local: local.ticket});
    }
    else {
      result = scope.build(data, mapItem);
    }

    return result;
  };

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
      cellMap[index] = scope._mapSwitch(data, map[index]);
    }

    return cellMap;
  };

};
