#!/bin/bash

java -jar build/yuicompressor-2.4.7.jar src/TicketPrint.user.js --type js  -o compressed.js
java -jar build/yuicompressor-2.4.7.jar src/main.css            --type css -o compressed.css

echo -n ";xing.jira.Application.init('$(cat compressed.css)')" >> compressed.js

echo -n 'javascript:void(function(){'                          >> bookmarklet.js
cat compressed.js                                              >> bookmarklet.js
echo -n ';xing.jira.Application.showPopup()'                   >> bookmarklet.js
echo -n '})();'                                                >> bookmarklet.js

mv bookmarklet.js jira-ticket-print-bookmarklet.js
mv compressed.js  jira-ticket-print.min.js
rm compressed.css
