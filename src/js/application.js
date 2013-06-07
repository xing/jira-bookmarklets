var xing = xing || {};
xing.jira = xing.jira || {};

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

  function hidePopup() {
    $('#gm-popup').remove();
    // jQuery 1.7+
    $(document).unbind('click', clickOutsidePopupHandler);
    // $(document).off('click', clickOutsidePopupHandler);
  }

  function addButton() {
    if ($('.gm-show-popup')[0]) {
      return false;
    }

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

  function buildPageIcon(markup, isTemporary) {
    var $fragment = $(markup),
      ticketNumber = $fragment.find('.gm-number .gm-bd').attr('title'),
      tempSelector = isTemporary ? '' : ' gm-remove-ticket',
      actionLabel = isTemporary ? 'New ticket' : 'Delete ticket'
    ;

    return '' +
      '<li>' +
         '<a href="#"' +
           ' class="gm-ticket-section' + tempSelector + '"' +
           ' title="' + actionLabel + ': ' + ticketNumber + '">' +
          '</a>' +
       '</li>'
    ;
  }

  function updateHTML(storedTickets) {
    $('#gm-popup').remove();
    var builder = xing.jira.TableBuilder,
      format = xing.jira.tableFormat(xing.jira.DataCollector.data),
      storedTicketsMarkup = '',
      currentTicketMarkup = builder.build(format),
      pageMarkup = ''
    ;

    pageMarkup = '';
    storedTickets.forEach(function (ticket) {
      pageMarkup += buildPageIcon(ticket);
    });
    pageMarkup += buildPageIcon(currentTicketMarkup, true);

    pageMarkup = '' +
      '<div class="gm-printable-tickets">' +
        '<span class="gm-printable-tickets-label">Selected Ticket: </span>' +
        '<ul>' + pageMarkup + '</ul>' +
      '</div>'
    ;

    storedTickets.forEach(function(markup) {
      if (markup !== currentTicketMarkup) {
        storedTicketsMarkup += markup;
      }
    });

    $('body').append(
      $('<div id="gm-popup">' +
         '<div class="gm-container aui-popup box-shadow">' +
           '<h2 class="aui-popup-heading">Print preview</h2>' +
           '<div class="aui-popup-content">' +
             '<div class="form-body">' +
               storedTicketsMarkup +
               currentTicketMarkup +
             '</div>' +
             '<div class="buttons-container form-footer">' +
               '<div class="gm-60 gm-grid-item">' +
                 pageMarkup +
               '</div>' +
               '<div class="buttons gm-40 gm-grid-item">' +
                 '<button class="gm-pick-more aui-button">' +
                   '<i>+</i> Select another' +
                 '</button>&nbsp;' +
                 '<button class="gm-print aui-button">Print</button>' +
                 '<a class="gm-cancel cancel" href="#">Cancel</a>' +
               '</div>' +
             '</div>' +
           '</div>' +
        '</div>'  +
         '<div class="aui-blanket"></div>' +
       '</div>'
      )
    );
  }

  var module = {

    addStyle: function (css) {
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
      var DataCollector = xing.jira.DataCollector;
      if ($('#gm-popup')[0]) { return; }
      // register observer
      DataCollector.subscribe(this);

      updateHTML(DataCollector.getStoredTickets());

      $('body')
        .on('click', '.gm-print', function (event) {
          event.preventDefault();
          window.print();
          DataCollector.removeStoredTickets();
          hidePopup();
        })
        .on('click', '.gm-pick-more', function (event) {
          event.preventDefault();
          var markup = $('#gm-popup .gm-table:last')[0].outerHTML;
          DataCollector.storeTicket(markup.trimWhitespace());
          hidePopup();
        })
        .on('click', '.gm-cancel', function (event) {
          event.preventDefault();
          hidePopup();
        })
        .on('click', '.gm-remove-ticket', function (event) {
          event.preventDefault();
          var $target = $(event.target).parent(),
            index = $target.index($target)
          ;
          DataCollector.removeStoredTickets(index);
          $('#gm-popup .form-body table').eq(index).remove();
          updateHTML(DataCollector.getStoredTickets());
        })
        .on('click', '#gm-add-collaborator', function () {
          DataCollector.addCollaborators();
        })
      ;
    },

    update: function () {
      updateHTML(xing.jira.DataCollector.getStoredTickets());
    },

    init: function (css) {
      module.addStyle(css);
      addButton();
    }

  };

  return module;

}(jQuery));
