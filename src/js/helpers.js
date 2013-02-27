// version 1.0.0
// ==UserScript==
// @name        TicketPrint
// @namespace   http://jira.com
// @description Gives the possibility to print out your story cards in a proper
// way
// @include     http://jira.*.*/jira/browse/*
// @include     https://jira.*.*/jira/browse/*
// @version     1
// ==/UserScript==
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

  'use strict';

  return this.replace(/\s+/g, ' ').split(/\n/).join(' ');
};
