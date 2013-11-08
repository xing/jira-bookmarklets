var xingJiraApp;
$.get('../output/main.min.css')
  .success(function (cssResources) {
    'use strict';
    run(cssResources);
  }).complete(function () {
    'use strict';
    run('');
  })
;
function run(cssResources) {
  'use strict';
  // xingJiraApp = new xing.jira.Application(cssResources);
  xingJiraApp = new xing.jira.Application(cssResources, xing.core.table.layout.SCRUM_LAYOUT);
  xingJiraApp.showPopup();
  var AJS = {};
  AJS.messages = {};
  AJS.messages.success = function () {};
}
