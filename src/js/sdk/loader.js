(function (options) {
  'use strict';
  options = options || {};
  options.kit =  options.kit || 0;
  options.env =  options.env || 0;
  options.path = options.path || 'https://source.xing.com/xws/jira-helpers/raw/';
  var doc = document,
    scriptTag    = doc.createElement('script'),
    environments = ['master','develop'],
    kits         = ['ticket-print', 'add-ticket'],
    environment  = environments[options.env],
    kit          = kits[options.kit],
    url          = options.path + environment + '/output/' + kit +'-bookmarklet.js'
  ;
  scriptTag.setAttribute('src', url);
  doc.head.appendChild(scriptTag);
})(options);
