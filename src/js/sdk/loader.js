/**
 * Loads specific scripts, depending on the parameters.
 * @class SDK Loader
 * @param {Object} options
 *   @param {Integer} [options.kit] Represent the serveral bookmarklet types (default: tricket-print).
 *   @param {Integer} [options.env] Represent the environment aka branch name (default: master).
 *   @param {String}  [options.path] Host url path of where the actual resource to be loaded.
 */
(function (options) {
  'use strict';

  options = options || {};
  options.kit = options.kit || 0;
  options.env = options.env || 0;
  options.path = options.path || '//rawgit.com/cange/jira-bookmarklets/';

  var doc = document,
    scriptTag = doc.createElement('script'),
    environments = ['master', 'develop'],
    kits = [
      'ticket-print',
      'add-ticket',
      'ticket-print-lay-scrum',
      'add-ticket-lay-scrum'
    ],
    environment = environments[options.env],
    kit = kits[options.kit],
    url = options.path + environment + '/build/' + kit + '-bookmarklet.js'
  ;
  scriptTag.setAttribute('src', url);
  doc.head.appendChild(scriptTag);
})(options);
