#!/bin/bash

#
#
# ticket print bookmarklet
cat src/js/helpers.js        >  combined.js
cat src/js/data_collector.js >> combined.js
cat src/js/table_format.js   >> combined.js
cat src/js/table_builder.js  >> combined.js
cat src/js/application.js    >> combined.js

java -jar build/yuicompressor-2.4.7.jar combined.js --type js  -o compressed.js
java -jar build/yuicompressor-2.4.7.jar src/css/main.css --type css -o compressed.css

timestamp=`date +%s`

echo -n 'javascript:void(function(){'                           >> bookmarklet.js
cat compressed.js                                               >> bookmarklet.js
echo -n "xing.jira.Application.init('$(cat compressed.css)');"  >> bookmarklet.js
echo -n "xing.jira.versionTimestamp=$timestamp;"                >> bookmarklet.js
echo -n 'xing.jira.Application.showPopup();'                    >> bookmarklet.js
echo -n '})();'                                                 >> bookmarklet.js

mv bookmarklet.js ticket-print-bookmarklet.js
#
#
# store ticket bookmarklet
echo -n 'javascript:void(function(){'                  >> bookmarklet.js
cat compressed.js                                      >> bookmarklet.js
echo -n "xing.jira.Application.init('$(cat compressed.css)');"  >> bookmarklet.js
echo -n "xing.jira.versionTimestamp=$timestamp;"       >> bookmarklet.js
echo -n "xing.jira.Application.storeTicketHandler();"  >> bookmarklet.js
echo -n '})();'                                        >> bookmarklet.js

mv bookmarklet.js add-ticket-bookmarklet.js
rm compressed.js combined.js compressed.css
