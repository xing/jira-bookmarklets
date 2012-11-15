// version 0.0.1
// 2012-10-10 Copyright (c) 2012, Christian Angermann
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name        TicketPrint
// @namespace   http://jira.com
// @description Gives the possibility to print out your story cards in a proper
// way
// @include     http://jira.*.*/jira/browse/*
// @include     https://jira.*.*/jira/browse/*
// @version     1
// ==/UserScript==
// bookmarklet wrapper
// javascript:void(function(){})();
///////////////////////////////////////////////////////////////////////////////
;String.prototype.truncate = function (maxlength) {

  'use strict';

  var length = this.length,
    suffix = '…',
    suffixLength = suffix.length,
    result = this
  ;
  if (length > maxlength) {
    result = this.substr(0, (maxlength - suffixLength)) + suffix;
  }
  return result;
};
/**
 * Will trim a string with whitespace and newlines like this:
 * '   foo
 *   bar  thut    '.trimWhitespace(); // output: 'foo bar thut'
 */
String.prototype.trimWhitespace = function () {
  return this.replace(/\s+/g, ' ').split(/\n/).join(' ');
};

///////////////////////////////////////////////////////////////////////////////

var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.Data = function ($) {

  'use strict';

  this.data = {};

  this.collectDataFromDom = function () {
    var $target = $('#greenhopper-agile-issue-web-panel dd');
    this.data = {
      number      : $('#key-val').text() || '',
      description : $('#description-val').html() || '',
      dueDate     : $('#due-date time').text() || '',
      members     : ['Björn', 'Christian', 'Jan', 'Johannes', 'Magith', 'Mark', 'Tanja'],
      type        : $('#type-val img').attr('alt') || '',
      reporter    : $('#reporter-val span').text() || '',
      created     : $('#create-date time').text() || '',
      title       : $('#summary-val a').text() || '',
      component   : $('#components-field').text() || '',
      target      : $target[0] ? $target.text().trimWhitespace() : ''
    };
  };

  // initialize
  this.collectDataFromDom();

};

xing.jira.Table = (function ($) {

  'use strict';

  function text(tag) {
    return 'text' in tag ? tag.text : '';
  }

  function options(tag, additionalClass) {
    additionalClass = ' ' + additionalClass || '';
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
      })

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
    },

    getFormat: function (data) {
      return module.format = [
        [
          {
            head: true,
            cell: {
              options: {cssClass: 'gm-number gm-center gm-20'},
              body: {
                text: data.number,
                options: {cssClass: 'h1'}
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
              options: {rowspan: 1},
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
                text: data.members.join(' '),
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
              options: {rowspan: 4, colspan: 4, cssClass: 'gm-desc gm-hyphen'},
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
    }

  };

  return module;

}(jQuery));
///////////////////////////////////////////////////////////////////////////////
xing.jira.Application = (function ($) {

  'use strict'; // jslint

  function clickOutsidePopupHandler(event) {
    var $target = $(event.target),
      $container = $target.hasClass('gm-container') && $target || $target.parents('.gm-container')
    ;
    // remove popup is mouse clicked outside the popup
    if (!$container[0]) {
      hidePopup();
    }
  }

  function hidePopup(argument) {
    $('#gm-popup').remove();
    // jQuery 1.7+
    $(document).unbind('click', clickOutsidePopupHandler);
    // $(document).off('click', clickOutsidePopupHandler);
  }

  function addButton() {
    if ($('.gm-show-popup')[0]) return false;

    var $wrapper = $('<li class="toolbar-item"></li>'),
      $button = $('<a href="#print" class="gm-show-popup toolbar-trigger">Print Card</a>'),
      $toolbars = $('.toolbar-group')
    ;

    $($toolbars[$toolbars.length - 1]).append($wrapper.append($button));

    $button.bind('click', function (event) {
    // jQuery 1.7+
    // $toolbars.on('click', '.gm-show-popup', function (event) {
      event.preventDefault();
      module.showPopup();
      // assign event listener after this click
      setTimeout(function () {
        $(document).click(clickOutsidePopupHandler);
        // jQuery 1.7+
        // $(document).on('click', clickOutsidePopupHandler);
      }, 1);
    });
  }

  var module = {

    addStyle: function(css) {
      var head,
        style = document.getElementById('gm-style')
      ;

      head = document.getElementsByTagName('head')[0];

      if (!style) {
        if (!head) {
          return;
        }
        style = document.createElement('style');
        style.setAttribute('id', 'gm-style');
        style.type = 'text/css';
        style.media = 'screen,print';
        head.appendChild(style);
      }
      style.innerHTML += css + '\n';
    },

    showPopup: function () {
      var data = new xing.jira.Data(jQuery).data,
        tableBuilder = xing.jira.Table,
        tableFormat = tableBuilder.getFormat(data)
      ;

      if ($('.gm-popup')[0]) return false;

      $('body').append(
        $('<div id="gm-popup">'
         + '  <div class="gm-container aui-popup box-shadow">'
         + '    <h2 class="aui-popup-heading">Print preview</h2>'
         + '    <div class="aui-popup-content">'
         + '      <div class="form-body">'
         +          tableBuilder.build(tableFormat)
         + '      </div>'
         + '      <div class="buttons-container form-footer">'
         + '        <div class="buttons">'
         + '          <button class="gm-print aui-button">Print</button>'
         + '          <a class="gm-cancel cancel" href="#">Cancel</a>'
         + '        </div>'
         + '      </div>'
         + '    </div>'
         + '  </div>'
         + '  <div class="aui-blanket"></div>'
         + '</div>'
        )
      );

      $('.gm-container')
        .delegate('.gm-print', 'click', function (event) {
        // jQuery 1.7+
        // .on('click', '.gm-print', function (event) {
          event.preventDefault();
          window.print();
        })
        .delegate('.gm-cancel', 'click', function (event) {
        // jQuery 1.7+
        // .on('click', '.gm-cancel', function (event) {
          event.preventDefault();
          hidePopup();
        })
      ;
    },

    init: function (css) {
      module.addStyle(css);
      addButton();

    },

  };

  return module;

}(jQuery));
