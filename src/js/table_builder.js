var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.TableBuilder = (function ($) {

  'use strict';

  function text(tag) {
    return 'text' in tag ? tag.text : '';
  }

  function options(tag, additionalClass) {
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
  }

  var module = {

    row: function (index, rowData) {
      var result = '';
      $(rowData).each(function(index, cellData) {
        result += module.cell(cellData);
      });

      return '<tr' + options(rowData) + '>' + result + '</tr>';
    },

    cell: function (cellData) {
      var cell = cellData.cell,
        result = '',
        tag = cellData.head ? 'th' : 'td'
      ;
      result += module.cellTitle(cell);
      result += module.cellBody(cell);

      return '<' + tag + options(cell) + '><div class="gm-inner">' + result + '</div></' + tag +'>';
    },

    cellBody: function (cell) {
      var result = '';

      if ('body' in cell) {
        var body = cell.body;

        result += '<div' + options(body, 'gm-bd') + '>' + text(body) + '</div>';
      }
      return result;
    },

    cellTitle: function (cell) {
      var result = '';

      if ('title' in cell) {
        var title = cell.title;
        result += '<div' + options(title, 'gm-hd') + '>' + text(title) + '</div>';
      }
      return result;
    },

    build: function (tableData) {
      var result = '';

      $(tableData).each(function (index, rowData) {
        result += module.row(index, rowData);
      });

      return '<table class="gm-table">' + result + '</table>';
    }

  };

  return module;

}(jQuery));
