var xing = xing || {};
xing.jira = xing.jira || {};

/**
 * @module xing.jira
 * @class TableBuilder
 * @requires jQuery
 * @type Object
 */
xing.jira.TableBuilder = function () {
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
   * @method _addOptions
   */
  scope._addOptions = function (tag, additionalClass) {
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
   */
  scope.row = function (rowData) {
    var result = '';

    rowData.forEach(function (cellData) {
      result += scope.cell(cellData);
    });

    return '<tr' + scope._addOptions(rowData) + '>' + result + '</tr>';
  };

  /**
   * @method cell
   */
  scope.cell = function (cellData) {
    var cell = cellData.cell,
      result = '',
      tag = cellData.head ? 'th' : 'td'
    ;
    result += scope.cellTitle(cell);
    result += scope.cellBody(cell);

    return '<' + tag + scope._addOptions(cell) + '>' +
             '<div class="gm-inner">' + result + '</div>' +
           '</' + tag + '>';
  };

  /**
   * @method cellBody
   */
  scope.cellBody = function (cell) {
    var result = '';

    if ('body' in cell) {
      var body = cell.body;

      result += '<div' + scope._addOptions(body, 'gm-bd') + '>' +
                  scope._text(body) +
                '</div>';
    }
    return result;
  };

  /**
   * @method cellTitle
   */
  scope.cellTitle = function (cell) {
    var result = '';

    if ('title' in cell) {
      var title = cell.title;
      result += '<div' + scope._addOptions(title, 'gm-hd') + '>' +
                  scope._text(title) +
                '</div>';
    }
    return result;
  };

  /**
   * @method render
   */
  scope.render = function (tableData) {
    var result = '';

    tableData.forEach(function (rowData) {
      result += scope.row(rowData);
    });

    return '<table class="gm-table">' + result + '</table>';
  };

};
