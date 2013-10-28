var xingJiraApp;
$.get('../output/main.min.css').done(function (cssResources) {
  'use strict';
  xingJiraApp = new xing.jira.Application(cssResources);
  xingJiraApp.showPopup();
  var AJS = {};
  AJS.messages = {};
  AJS.messages.success = function () {};
});
