var xing = xing || {};
xing.jira = xing.jira || {};

xing.jira.data = (function ($) {

  'use strict';

  var $target = $('#greenhopper-agile-issue-web-panel dd'),
    module = {
      number:      $('#key-val').text() || '',
      description: $('#description-val').text() || '',
      dueDate:     $('#due-datetime').text() || '',
      members:     ['Christian', 'Jan', 'Johannes', 'Magith', 'Mark', 'Tanja'],
      type:        $('#type-valimg').attr('alt') || '',
      reporter:    $('#reporter-valspan').text() || '',
      created:     $('#create-datetime').text() || '',
      title:       $('#summary-vala').text() || '',
      component:   $('#components-field').text() || '',
      target:      $target[0] ? $target.text().trimWhitespace() : ''
    }
  ;
  return module;
}(jQuery));
