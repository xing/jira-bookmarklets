Namespace.create('xing.jira');

/**
 * @constructor
 * @module xing.jira
 * @class Application
 * @requires AJS
 * @requires jQuery
 * @requires xing.core.table
 * @requires xing.core.Presenter
 * @requires xing.core.I18n
 * @requires xing.core.DataCollector
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
      dataCollector,
      ticketCache,
      local,
      tableBuilder
  ;

  /**
   * @method initialize
   * @see xing.jira.Application
   */
  scope.initialze = function (cssResources, options) {
    scope.layoutName = options && options.layoutName || '';
    dataCollector  = new nsXC.DataCollector();
    ticketCache    = new nsXC.TicketCache();
    tableBuilder   = new nsXC.table.Builder();
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
          currentNumber = map.number,
          buttonSelecotrs = 'aui-button gm-button-danger js-gm-remove-ticket'
      ;

      if (number !== currentNumber) {
        cachedTicketsMarkup += '' +
          '<li class="gm-output-item">' +
             tableBuilder.render(scope.tableMap.build(cachedTicketMap), builderRenderOptions) +
             '<div class="gm-ticket-action-panel">' +
               '<button type="button" class="' + buttonSelecotrs + '">' +
                 local.modal.action.remove +
               '</button>' +
             '</div>' +
           '</li>'
        ;
      }
    });

    $('body').append(
      $('<div id="gm-popup">' +
         '<div class="gm-container jira-dialog box-shadow gm-print-hidden">' +
           '<div class="jira-dialog-heading">' +
             '<h2>' + local.modal.heading + '</h2>' +
           '</div>' +
           '<div class="jira-dialog-content">' +
             '<div class="gm-page-counter h5">' +
               local.modal.ticketCount + ' ' + numberOfTickets +
               local.modal.pageCount + ' ' + numberOfPages +
             '</div>' +
             '<div class="form-body">' +
               '<ul class="gm-output-list">' +
                 cachedTicketsMarkup +
                 '<li class="gm-output-item">' + currentTicketMarkup + '</li>' +
               '</ul>' +
             '</div>' +
             '<div class="buttons-container form-footer gm-print-hidden">' +
               '<div class="buttons">' +
                 '<label for="gm-select-ticket">' +
                   local.modal.select +
                 '</label>&nbsp;' +
                 '<button id="gm-select-ticket" ' +
                   'class="gm-pick-more aui-button">' +
                   '<i>+</i>' +
                 '</button>&nbsp;' +
                 '<button class="gm-print aui-button">' +
                   local.modal.action.print +
                '</button>' +
                '<a class="gm-cancel cancel" href="#">' +
                   local.modal.action.cancel +
                '</a>' +
               '</div>' +
             '</div>' +
           '</div>' +
        '</div>'  +
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
    dataCollector.subscribe(this);
    dataCollector.subscribe(ticketCache);

    scope.update(ticketCache.get());

    $('body')
      .on('click', '.gm-print', function (event) {
        event.preventDefault();
        window.print();
        ticketCache.remove();
        scope._hidePopup();
      })
      .on('click', '.gm-pick-more', function (event) {
        event.preventDefault();
        scope.cacheTicketHandler();
      })
      .on('click', '.gm-cancel', function (event) {
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
      .on('click', '#gm-add-collaborator', function () {
        dataCollector.addCollaborators(local.modal.collaboratorPrompt);
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
        type = presenter.getString($('#type-val img').attr('alt')),
        collaboratorKey = dataCollector.COLLABORATOR_KEY,
        title = presenter.getString($('#summary-val').text())
    ;

    ticketCache.latest = {
      number:        presenter.getString($('#key-val').text()),
      description:   presenter.getString($('#description-val').text()),
      storyPoints:   presenter.getString($('#customfield_10080-val').text()),
      dueDate:       presenter.getDate($('#due-date time').attr('datetime')),
      collaborators: presenter.getStorageItem(collaboratorKey).join(' '),
      type:          type,
      typeSelector:  presenter.dashalizer(type),
      reporter:      presenter.getString($('#reporter-val span').text()),
      created:       presenter.getDate($('#create-date time').attr('datetime')),
      title:         title.truncate(220),
      component:     presenter.getString($('#components-field').text()),
      target:        presenter.getElementText($target)
    };
    dataCollector.update();
  };

  scope.initialze(cssResources, options);
};
