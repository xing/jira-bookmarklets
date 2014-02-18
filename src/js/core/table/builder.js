Namespace.create('xing.core.table');

/**
 * @module xing.core.table
 * @class Builder
 * @type function
 * @requires jQuery
 */
xing.core.table.Builder = function () {
  'use strict';

  var scope = this;

  /**
   * Returns text content if available otherwise an empty string.
   * @private
   * @method _text
   * @return {String}
   */
  scope._text = function (tag) {
    return 'text' in tag ? tag.text : '';
  };

  /**
   * @private
   * @method _addCssClass
   */
  scope._addCssClass = function (tag, additionalClass) {
    additionalClass = ' ' + (additionalClass || '');

    var options = tag['options'] || {},
        cssClass = 'cssClass' in options ? options.cssClass : '',
        attrs = '',
        option
    ;

    $.extend(options, {cssClass: cssClass + additionalClass});

    if (options.cssClass === ' ') {
      delete options.cssClass;
    }

    for (option in options) {
      var attr = option === 'cssClass' ? 'class' : option,
        value = options[option] || ''
      ;

      attr = attr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      attrs += ' ' + attr + '="' + value + '"';
    }
    return attrs;
  };

  /**
   * @method row
   * @param {Array} rowData e.g. [{cell:{}}]
   * @return {String} table row tag
   */
  scope.row = function (rowData) {
    var result = '';

    rowData.forEach(function (cellData) {
      result += scope.cell(cellData);
    });

    return '<tr>' + result + '</tr>';
  };

  /**
   * @method cell
   * @param {Object} cellData e. g. {cell:{}}
   * @return {String} table cell tag
   */
  scope.cell = function (cellData) {
    var cell = cellData.cell,
        result = '',
        tag = cellData.head ? 'th' : 'td'
    ;
    result += scope._cellTitle(cell);
    result += scope._cellBody(cell);
    return '<' + tag + scope._addCssClass(cell) + '>' +
             '<div class="gm-inner">' + result + '</div>' +
           '</' + tag + '>';
  };

  /**
   * @private
   * @method _cellBody
   */
  scope._cellBody = function (cell) {
    var result = '';

    if ('body' in cell) {
      var body = cell.body;

      result += '<div' + scope._addCssClass(body, 'gm-bd') + '>' +
                  scope._text(body) +
                '</div>';
    }
    return result;
  };

  /**
   * @private
   * @method _cellTitle
   */
  scope._cellTitle = function (cell) {
    var result = '';

    if (cell.title) {
      var title = cell.title;
      result += '<div' + scope._addCssClass(title, 'gm-hd') + '>' +
                  scope._text(title) +
                '</div>';
    }
    return result;
  };

  /**
   * @method render
   * @param {xing.jira.table.Map} tableData
   * @param {Object} options Hash of optional parameters
   *   @param {Object} [options.layoutName] Layout class selector necessary for specific themes
   */
  scope.render = function (tableData, options) {
    var result = '',
        cssClass = options && options.layoutName ? ' gm-' + options.layoutName + '-layout' : ''
    ;
    tableData.forEach(function (rowData) {
      result += scope.row(rowData);
    });

    return '<table class="gm-table' + cssClass + '">' + result + '</table>';
  };

};
