var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.ListToggle = (function ($) {

  'use strict'; // jslint

  function toggle($container) {
    $container.find('.ghx-issue').toggle();
  }

  function prepareItem() {
    var $this = $(this)
      , $header = $this.find('.ghx-marker-header')
    ;

    toggle($this);

    if (!$header.find('.ghx-twix')[0]) {
      var $arrow = $('<span class="ghx-twix"></span>');
      $header
        .addClass('ghx-sprint-active')
        .find('h2').prepend($arrow)
      ;
      $arrow.click(function () {
        toggle($this);
        $this.find('.ghx-sprint-active h2').toggleClass('ghx-open');
      });
    }

  }

  $('.ghx-planned-sprint-container').each(prepareItem);

}(jQuery));
