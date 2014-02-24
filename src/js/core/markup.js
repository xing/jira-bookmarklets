Namespace.create('xing.core');

/**
 * This is a library of the most markup snippets of the bookmarlet
 */
xing.core.Markup = function () {
  'use strict';

  var scope = this;

  /**
   * @method ticketPanel
   * @param {String} label
   */
  scope.ticketPanel = function (label) {
    return '' +
      '<div class="gm-ticket-action-panel gm-print-hidden">' +
        '<button type="button" class="aui-button js-gm-remove-ticket">' +
          '<i class="aui-icon aui-icon-small aui-iconfont-remove"></i>' + label +
        '</button>' +
      '</div>'
    ;
  };

  /**
   * @method dialogHeader
   * @param {String} label
   */
  scope.dialogHeader = function (label) {
    return '' +
      '<header class="jira-dialog-heading gm-print-hidden">' +
        '<h2>' + label + '</h2>' +
      '</header>'
    ;
  };

  /**
   * @method dialogFooter
   * @param {String} selectLabel
   * @param {String} printLabel
   * @param {String} canceltLabel
   */
  scope.dialogFooter = function (selectLabel, printLabel, cancelLabel) {
    return '' +
      '<footer class="buttons-container form-footer gm-print-hidden">' +
        '<div class="buttons">' +
          '<label for="gm-select-ticket">' + selectLabel + '</label>&nbsp;' +
          '<button id="gm-select-ticket" class="js-gm-pick-more aui-button" title="' + selectLabel + '">' +
            '<i class="aui-icon aui-icon-small aui-iconfont-add"></i>' +
          '</button>' +
          '<button class="js-gm-print-action aui-button aui-button-primary">' + printLabel + '</button>' +
          '<a class="js-gm-cancel-action aui-button aui-button-link" href="#">' + cancelLabel + '</a>' +
        '</div>' +
      '</footer>'
    ;
  };

  /**
   * @method pageCounter
   * @param {String} ticketText
   * @param {String} pageText
   * @param {String} ticketCount
   * @param {String} pageCount
   */
  scope.pageCounter = function (ticketText, pageText, ticketCount, pageCount) {
    return '' +
      '<div class="gm-page-counter gm-print-hidden">' +
        ticketText + ' <span class="aui-badge">' + ticketCount + '</span>' +
        pageText + ' <span class="aui-badge">' + pageCount  + '</span>' +
      '</div>'
    ;
  };

  /**
   * @method pageCounter
   * @param {String} cachedTicketsMarkup
   * @param {String} currentTicketMarkup
   */
  scope.ticketPreview = function (cachedTicketsMarkup, currentTicketMarkup) {
    return '' +
      '<div class="form-body">' +
        '<ul class="gm-output-list">' +
          cachedTicketsMarkup +
          '<li class="gm-output-item">' + currentTicketMarkup + '</li>' +
        '</ul>' +
      '</div>'
    ;
  };

};
