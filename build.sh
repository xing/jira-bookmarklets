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

echo -n ";xing.jira.Application.init('$(cat compressed.css)')" >> compressed.js

echo -n 'javascript:void(function(){'        >> bookmarklet.js
cat compressed.js                            >> bookmarklet.js
echo -n ';xing.jira.Application.showPopup()' >> bookmarklet.js
echo -n '})();'                              >> bookmarklet.js

mv bookmarklet.js jira-ticket-print-bookmarklet.js
rm combined.js compressed.js compressed.css
#
#
# toggle list bookmarklet
cat src/js/list_toggle.js    >> combined.js

java -jar build/yuicompressor-2.4.7.jar combined.js --type js  -o compressed.js

echo -n 'javascript:void(function(){'        >> bookmarklet.js
cat compressed.js                            >> bookmarklet.js
echo -n '})();'                              >> bookmarklet.js

mv bookmarklet.js jira-list-toggle-bookmarklet.js
rm combined.js compressed.js
