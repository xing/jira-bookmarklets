'use strict';

var xingJiraApp;
$.get('../build/main.min.css')
  .success(function (cssResources) {
    run(cssResources);
  }).complete(function () {
    run('');
  })
;
function run(cssResources) {
  // xingJiraApp = new xing.jira.Application(cssResources);
  xingJiraApp = new xing.jira.Application(cssResources, xing.core.table.layout.SCRUM_LAYOUT);
  xingJiraApp.showPopup();
  var AJS = {};
  AJS.messages = {};
  AJS.messages.success = function () {};
}
