#!/bin/bash

java -jar yuicompressor-2.4.7.jar src/TicketPrint.user.js --type js  -o compressed.js
java -jar yuicompressor-2.4.7.jar src/main.css            --type css -o compressed.css

echo -n "xing.jira.Application.init('$(cat compressed.css)')" >> compressed.js

echo -n 'javascript:void(function(){'       >> bookmarklet
cat compressed.js                           >> bookmarklet
echo -n 'xing.jira.Application.showPopup()' >> bookmarklet
echo -n '})();'                             >> bookmarklet

mv bookmarklet ../jira-ticket-print-bookmarklet.js
mv compressed.js ../jira-ticket-print.min.js
rm compressed.css
