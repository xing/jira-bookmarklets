Namespace.create('xing.jira');

/**
 * @constructor
 * @module xing.jira
 * @class Application
 * @requires AJS
 * @requires jQuery
 * @requires xing.core.Observer
 * @requires xing.core.ticketCache
 * @requires xing.core.Presenter
 * @requires xing.core.I18n
 * @requires xing.jira.TableMapCell
 * @type Object
 * @param {String} cssResources A string of CSS definitions. e.g. 'body { color: red; }'
 * @param {Object} options Hash of optional parameters
 *   @param {Object} [options.layoutName] Layout class selector necessary for specific themes
 */
xing.jira.Application = function (cssResources, options) {
  'use strict';

  var scope = this,
      nsXC = xing.core,
      observer,
      ticketCache,
      local,
      markup,
      tableBuilder
  ;

  /**
   * @method initialize
   * @see xing.jira.Application
   */
  scope.initialze = function (cssResources, options) {
    scope.layoutName = options && options.layoutName || '';
    observer  = new nsXC.Observer();
    ticketCache    = new nsXC.TicketCache();
    tableBuilder   = new nsXC.table.Builder();
    markup         = new nsXC.Markup();
    local          = (new nsXC.I18n()).local();
    scope.tableMap = new nsXC.table.Map(new xing.jira.TableMapCell(), local, scope.layoutName);
    scope.addStyle(cssResources);
    scope.collectDataFromDom();
  };

  /**
   * @private
   * @method _getContainer
   * @param {jQueryObject} $el
   * @return {jQueryObject}
   */
  scope._getContainer = function ($el) {
    return $el.hasClass('gm-container') && $el || $el.parents('.gm-container');
  };

  /**
   * @private
   * @method _clickOutsidePopupHandler
   */
  scope._clickOutsidePopupHandler = function (event) {
    var $target = $(event.target),
        $container = scope._getContainer($target)
    ;
    // remove popup is mouse clicked outside the popup
    if (!$container[0]) {
      scope._hidePopup();
    }
  };

  /**
   * @private
   * @method _hidePopup
   */
  scope._hidePopup = function () {
    $('#gm-popup').remove();
    $(document).off('click', scope._clickOutsidePopupHandler);
  };

  /**
   * @private
   * @method _updateHTML
   */
  scope._updateHTML = function (cachedTicketMaps) {
    $('#gm-popup').remove();

    var map = scope.tableMap.build(ticketCache.latest),
        builderRenderOptions = {layoutName: scope.layoutName},
        currentTicketMarkup = tableBuilder.render(map, builderRenderOptions),
        cachedTicketsMarkup = '',
        numberOfTickets = cachedTicketMaps.length + 1,
        numberOfPages = Math.ceil(numberOfTickets / 2)
    ;

    cachedTicketMaps.forEach(function (cachedTicketMap) {
      var number = cachedTicketMap.number,
          currentNumber = map.number
      ;

      if (number !== currentNumber) {
        cachedTicketsMarkup += '' +
          '<li class="gm-output-item">' +
             tableBuilder.render(scope.tableMap.build(cachedTicketMap), builderRenderOptions) +
             markup.ticketPanel(local.modal.action.remove) +
          '</li>'
        ;
      }
    });

    $('body').append(
      $('<div id="gm-popup">' +
         '<section class="gm-container jira-dialog box-shadow">' +
           markup.dialogHeader(local.modal.heading) +
           '<div class="jira-dialog-content">' +
             markup.pageCounter(local.modal.ticketCount, numberOfTickets, local.modal.pageCount, numberOfPages) +
             markup.ticketPreview(cachedTicketsMarkup, currentTicketMarkup) +
           '</div>' +
           markup.dialogFooter(local.modal.select, local.modal.action.print, local.modal.action.cancel) +
         '</section>' +
         '<div class="aui-blanket gm-print-hidden"></div>' +
       '</div>'
      )
    );
  };

  /**
   * @method addStyle
   */
  scope.addStyle = function (resources) {
    if ($('#gm-style')[0] || !resources) { return; }

    var $style = $('<style id="gm-style" type="text/css"></style>');

    $(document.head).append($style.html(resources));
  };

  /**
   * @method cacheTicketHandler
   */
  scope.cacheTicketHandler = function () {
    scope.update();
    var map = ticketCache.latest;

    ticketCache.add(map);
    scope._hidePopup();
    scope._showSuccessMessage();
  };

  /**
   * @private
   * @method _showSuccessMessage
   */
  scope._showSuccessMessage = function () {
    $('.aui-message').remove();
    if (window.AJS) {
      AJS.messages.success('.aui-page-header-inner', {
        title: local.messages.ticketCached.title,
        body: local.messages.ticketCached.body
      });
    }
    setTimeout(function () {
      $('.aui-message').remove();
    }, 5000);
  };

  /**
   * @method showPopup
   */
  scope.showPopup = function () {
    if ($('#gm-popup')[0]) { return; }
    // register observer
    observer.subscribe(this);
    observer.subscribe(ticketCache);

    scope.update(ticketCache.get());

    $('body')

      .on('click', '.js-gm-print-action', function (event) {
        event.preventDefault();
        window.print();
        ticketCache.remove();
        scope._hidePopup();
      })

      .on('click', '.js-gm-pick-more', function (event) {
        event.preventDefault();
        scope.cacheTicketHandler();
      })

      .on('click', '.js-gm-cancel-action', function (event) {
        event.preventDefault();
        scope._hidePopup();
      })

      .on('click', '.js-gm-remove-ticket', function (event) {
        event.preventDefault();
        var $target = $(event.target).parents('li'),
          index = $target.index($target)
        ;
        ticketCache.remove(index);
        $('#gm-popup .form-body table').eq(index).remove();
        scope.update(ticketCache.get());
      })

      .on('click', '.gm-change-collaborators', function () {
        var index = $('.gm-output-list button').index(this) - 1,
            names, confirmedNames
        ;

        if ($(this).parents('.is-current')) {
          names = ticketCache.getCollaborators();
        }
        else {
          names = ticketCache.getCollaborators(index);
        }

        confirmedNames = window.prompt(local.modal.collaboratorPrompt, names || '');
        if (confirmedNames !== null) {
          ticketCache.updateCollaborators(index, confirmedNames.trimWhitespace());
          scope.update();
        }

      })
    ;
  };

  /**
   * @method update
   */
  scope.update = function () {
    scope._updateHTML(ticketCache.get());
  };

  /**
   * Collect and formatted data from the DOM
   * @method collectDataFromDom
   */
  scope.collectDataFromDom = function () {
    var $target = $('#greenhopper-agile-issue-web-panel dd a'),
        presenter = new nsXC.Presenter(),
        type = presenter.getString($('#type-val img').attr('alt'))
    ;

    ticketCache.latest = {
      number:        presenter.getString($('#key-val').text()),
      description:   presenter.getString($('#description-val').html()),
      storyPoints:   presenter.getString($('#customfield_12470-val').text()),
      dueDate:       presenter.getDate($('#due-date time').attr('datetime')),
      collaborators: ticketCache.getCollaborators(),
      type:          type,
      typeSelector:  presenter.dashalizer(type),
      reporter:      presenter.getString($('#reporter-val span').text()),
      created:       presenter.getDate($('#create-date time').attr('datetime')),
      title:         presenter.getString($('#summary-val').text()),
      component:     presenter.getString($('#components-field').text()),
      target:        presenter.getElementText($target)
    };
    observer.update();
  };

  scope.initialze(cssResources, options);
};
