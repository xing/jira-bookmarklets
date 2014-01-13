javascript:void(function(){var Namespace=function(a){"use strict";return{create:function(b){for(var c,d=a,e=b.split("."),f=e.length,g=0;f>g;g++)c=e[g],d=d[c]=d[c]||{}},is:function(b){for(var c,d=a,e=!1,f=b.split("."),g=f.length,h=0;g>h;h++){if(c=f[h],!d[c])return e=!1,!1;d=d[c],e=!0}return e}}}(this);Namespace.create("xing.core"),xing.core.DataCollector=function(){"use strict";var a=this,b=location.hostname,c=b?".":"";a.COLLABORATOR_KEY=b+c+"collaborators",a.observers=[],a.subscribe=function(b){a.observers.push(b)},a.unsubscribe=function(b){var c=a.observer.indexOf(b);c>=0&&a.observers.splice(c)},a.update=function(){a.observers.forEach(function(a){a.update()})},a.addCollaborators=function(b){var c=localStorage.getItem(a.COLLABORATOR_KEY)||"",d=window.prompt(b,c||"");null!==d&&(localStorage.setItem(a.COLLABORATOR_KEY,d),this.update({collaborators:d.toArray()}))}},String.prototype.truncate=function(a){"use strict";var b=this.length,c="…",d=c.length,e=this;return b>a&&(e=this.substr(0,a-d)+c),e},String.prototype.trimWhitespace=function(){"use strict";return this.replace(/\s+/g," ").split(/\n/).join(" ")},String.prototype.toArray=function(a){"use strict";return a=new RegExp(a||","),this.split(a)},Namespace.create("xing.core"),xing.core.I18n=function(){"use strict";this.en={messages:{ticketCached:{title:"Ticket print",body:"Ticket is stored! Please navigate to another if you want print one ticket more."}},modal:{collaboratorPrompt:'Please enter your collaborators!\nNote: Separate the names with a comma e.g. "Jeffrey, Walter"',heading:"Print preview",select:"Select another:",action:{addCollaborator:"Collaborators",remove:"Remove ticket form the list",print:"Print",cancel:"Cancel"},ticketCount:"You are printing tickets",pageCount:" on pages"},ticket:{collaborator:{title:"Pairing partner",action:'<button id="gm-add-collaborator" class="aui-button gm-snap-right">Collaborators</button>'},component:{title:"Component"},closed:{title:"End date",body:"Day | Time"},created:{title:"Created"},storyPoints:{title:"Story Points"},dueDate:{title:"Due date"},reporter:{title:"Reporter"},target:{title:"Target"},type:{title:"Type"},start:{title:"Start Progress",body:"Day | Time"}}},this.local=function(a){return this[a||"en"]}},Namespace.create("xing.core"),xing.core.Presenter=function(){"use strict";var a=this;a.dashalizer=function(a){return a.toLowerCase().replace(/ /g,"-")},a.getString=function(a){return(a||"").trimWhitespace()},a.getDate=function(a){var b,c,d,e,f="";return a&&(b=new Date(a),c=b.getMonth()+1,c=c>9?c:"0"+c,d=b.getFullYear(),e=b.getDate(),f=d+"-"+c+"-"+e),f},a.getStorageItem=function(a){var b=localStorage.getItem(a)||"";return b.toArray()},a.getElementText=function(a){return a[0]?a.text().trimWhitespace():""}},Namespace.create("xing.core.table"),xing.core.table.Builder=function(){"use strict";var a=this;a._text=function(a){return"text"in a?a.text:""},a._addCssClass=function(a,b){b=" "+(b||"");var c,d=a.options||{},e="cssClass"in d?d.cssClass:"",f="";$.extend(d,{cssClass:e+b})," "===d.cssClass&&delete d.cssClass;for(c in d){var g="cssClass"===c?"class":c,h=d[c]||"";g=g.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),f+=" "+g+'="'+h+'"'}return f},a.row=function(b){var c="";return b.forEach(function(b){c+=a.cell(b)}),"<tr>"+c+"</tr>"},a.cell=function(b){var c=b.cell,d="",e=b.head?"th":"td";return d+=a._cellTitle(c),d+=a._cellBody(c),"<"+e+a._addCssClass(c)+'><div class="gm-inner">'+d+"</div></"+e+">"},a._cellBody=function(b){var c="";if("body"in b){var d=b.body;c+="<div"+a._addCssClass(d,"gm-bd")+">"+a._text(d)+"</div>"}return c},a._cellTitle=function(b){var c="";if(b.title){var d=b.title;c+="<div"+a._addCssClass(d,"gm-hd")+">"+a._text(d)+"</div>"}return c},a.render=function(b){var c="";return b.forEach(function(b){c+=a.row(b)}),'<table class="gm-table">'+c+"</table>"}},Namespace.create("xing.core.table"),xing.core.table.layout={DEFAULT_LAYOUT:"default",SCRUM_LAYOUT:"scrum",_layouts:{"default":[["number","type","component","target"],["title"],["collobarators"],["created","dueDate","reporter","start","closed"]],scrum:[["number","type","component","target"],["title"],["collobarators"],["created","dueDate","start","closed","storyPoints"]]},get:function(a){"use strict";var b=this._layouts[a];return b}},xing.core.table.Map=function(a,b){"use strict";var c=this,d=(new xing.core.I18n).local().ticket,e=xing.core.table.layout;b=b||e.DEFAULT_LAYOUT,c.build=function(f,g){g=g||e.get(b);for(var h=[],i=0,j=g.length;j>i;i++){var k=g[i];"string"==typeof k?(d=d,h[i]=a[k]({data:f,local:d})):h[i]=c.build(f,k)}return h}},Namespace.create("xing.core"),xing.core.TicketCache=function(){"use strict";var a=this,b=location.hostname,c=b?".":"";a.STORAGE_KEY=b+c+"ticket",a.data={},a.latest={},a.update=function(){a.data=$.extend(a.data,a.latest)},a.get=function(b){var c=localStorage.getItem(a.STORAGE_KEY),d=c&&c[0]?JSON.parse(c):[];return void 0!==b&&d[b]&&(d=[d[b]]),d},a.add=function(b){if(b){var c=a.get(),d=c.concat([b]);localStorage.setItem(a.STORAGE_KEY,JSON.stringify(d))}},a.remove=function(b){if(void 0!==b){var c=a.get();c[0]&&(c.splice(b,1),localStorage.setItem(a.STORAGE_KEY,JSON.stringify(c)))}else localStorage.removeItem(a.STORAGE_KEY);return a.get()}},Namespace.create("xing.jira"),xing.jira.Application=function(a,b){"use strict";var c,d,e,f,g=this,h=xing.core;g.initialze=function(a){c=new h.DataCollector,d=new h.TicketCache,f=new h.table.Builder,g.tableMap=new h.table.Map(new xing.jira.TableMapCell,b),e=(new h.I18n).local(),g.addStyle(a),g.collectDataFromDom()},g._getContainer=function(a){return a.hasClass("gm-container")&&a||a.parents(".gm-container")},g._clickOutsidePopupHandler=function(a){var b=$(a.target),c=g._getContainer(b);c[0]||g._hidePopup()},g._hidePopup=function(){$("#gm-popup").remove(),$(document).off("click",g._clickOutsidePopupHandler)},g._updateHTML=function(a){$("#gm-popup").remove();var b=g.tableMap.build(d.latest),c=f.render(b),h="",i=a.length+1,j=Math.ceil(i/2);a.forEach(function(a){var c=a.number,d=b.number,i="aui-button gm-button-danger js-gm-remove-ticket";c!==d&&(h+='<li class="gm-output-item">'+f.render(g.tableMap.build(a))+'<div class="gm-ticket-action-panel"><button type="button" class="'+i+'">'+e.modal.action.remove+"</button></div></li>")}),$("body").append($('<div id="gm-popup"><div class="gm-container jira-dialog box-shadow"><div class="jira-dialog-heading"><h2>'+e.modal.heading+'</h2></div><div class="jira-dialog-content"><div class="gm-page-counter h5">'+e.modal.ticketCount+" "+i+e.modal.pageCount+" "+j+'</div><div class="form-body"><ul class="gm-output-list">'+h+'<li class="gm-output-item">'+c+'</li></ul></div><div class="buttons-container form-footer"><div class="buttons"><label for="gm-select-ticket">'+e.modal.select+'</label>&nbsp;<button id="gm-select-ticket" class="gm-pick-more aui-button"><i>+</i></button>&nbsp;<button class="gm-print aui-button">'+e.modal.action.print+'</button><a class="gm-cancel cancel" href="#">'+e.modal.action.cancel+'</a></div></div></div></div><div class="aui-blanket"></div></div>'))},g.addStyle=function(a){if(!$("#gm-style")[0]&&a){var b=$('<style id="gm-style" type="text/css"></style>');$(document.head).append(b.html(a))}},g.cacheTicketHandler=function(){g.update();var a=d.latest;d.add(a),g._hidePopup(),g._showSuccessMessage()},g._showSuccessMessage=function(){$(".aui-message").remove(),window.AJS&&AJS.messages.success(".aui-page-header-inner",{title:e.messages.ticketCached.title,body:e.messages.ticketCached.body}),setTimeout(function(){$(".aui-message").remove()},5e3)},g.showPopup=function(){$("#gm-popup")[0]||(c.subscribe(this),c.subscribe(d),g.update(d.get()),$("body").on("click",".gm-print",function(a){a.preventDefault(),window.print(),d.remove(),g._hidePopup()}).on("click",".gm-pick-more",function(a){a.preventDefault(),g.cacheTicketHandler()}).on("click",".gm-cancel",function(a){a.preventDefault(),g._hidePopup()}).on("click",".js-gm-remove-ticket",function(a){a.preventDefault();var b=$(a.target).parents("li"),c=b.index(b);d.remove(c),$("#gm-popup .form-body table").eq(c).remove(),g.update(d.get())}).on("click","#gm-add-collaborator",function(){c.addCollaborators(e.modal.collaboratorPrompt)}))},g.update=function(){g._updateHTML(d.get())},g.collectDataFromDom=function(){var a=$("#greenhopper-agile-issue-web-panel dd a"),b=new h.Presenter,e=b.getString($("#type-val img").attr("alt")),f=c.COLLABORATOR_KEY,g=b.getString($("#summary-val").text());d.latest={number:b.getString($("#key-val").text()),description:b.getString($("#description-val").text()),storyPoints:b.getString($("#customfield_10080-val").text()),dueDate:b.getDate($("#due-date time").attr("datetime")),collaborators:b.getStorageItem(f).join(" "),type:e,typeSelector:b.dashalizer(e),reporter:b.getString($("#reporter-val span").text()),created:b.getDate($("#create-date time").attr("datetime")),title:g.truncate(220),component:b.getString($("#components-field").text()),target:b.getElementText(a)},c.update()},g.initialze(a)},Namespace.create("xing.jira"),xing.jira.TableMapCell=function(){"use strict";var a=this,b=5;a._titleBody=function(a,b){return{cell:{options:{cssClass:"gm-jira-"+b},title:{text:a.local[b].title},body:{text:a.data[b]}}}},a.number=function(a){return{head:!0,cell:{options:{colspan:2,cssClass:"gm-jira-number"},body:{text:a.data.number,options:{title:a.data.number}}}}},a.type=function(a){return{cell:{options:{cssClass:"gm-jira-type"},title:{text:a.local.type.title},body:{options:{cssClass:"gm-label-"+a.data.typeSelector},text:a.data.type}}}},a.component=function(b){return a._titleBody(b,"component")},a.target=function(b){return a._titleBody(b,"target")},a.title=function(a){return{head:!0,cell:{options:{colspan:b,cssClass:"gm-jira-title"},body:{text:a.data.title}}}},a.collobarators=function(a){return{cell:{options:{colspan:b,cssClass:"gm-jira-pairing"},title:{text:a.local.collaborator.title},body:{text:a.data.collaborators+a.local.collaborator.action}}}},a.created=function(b){return a._titleBody(b,"created")},a.dueDate=function(a){return{cell:{title:{text:a.local.dueDate.title},body:{options:{cssClass:a.data.dueDate?"gm-label-danger":""},text:a.data.dueDate}}}},a.reporter=function(b){return a._titleBody(b,"reporter")},a.storyPoints=function(a){return{cell:{options:{cssClass:"gm-jira-story"},title:{text:a.local.storyPoints.title},body:{text:a.data.storyPoints}}}},a.start=function(a){return{cell:{options:{cssClass:"gm-date-content gm-20"},title:{text:a.local.start.title},body:{text:a.local.start.body}}}},a.closed=function(a){return{cell:{options:{cssClass:"gm-date-content gm-20"},title:{text:a.local.closed.title},body:{text:a.local.closed.body}}}}};var xingJiraApp = new xing.jira.Application('@charset "UTF-8";.gm-left,.gm-ltr,.gm-jira-number,.gm-jira-title{text-align:left}.gm-center,.gm-jira-story .gm-hd,.gm-jira-story .gm-bd{text-align:center}.gm-snap-left,.gm-jira-pairing .gm-hd{float:left}.gm-snap-right{float:right}.gm-jira-title .gm-bd{hyphens:auto;-o-hyphens:auto;-ms-hyphens:auto;-moz-hyphens:auto;-wekit-hyphens:auto}.gm-grid-item{display:inline-block}.gm-10{width:10%}.gm-20{width:20%}.gm-40{width:40%}.gm-60{width:60%}.h1,.gm-jira-number .gm-bd{font-size:3em}.h2,.gm-jira-title .gm-bd{font-size:2.4em}.h3,.gm-jira-story .gm-bd{font-size:2em}.h4{font-size:1.4em;line-height:1.5em}.h5,.gm-hd,.gm-jira-pairing .gm-hd,.gm-jira-pairing .gm-bd,.gm-page-counter{font-size:.8em;line-height:1.4em}@media print{.gm-print-hidden{display:none}}.gm-table{border-collapse:collapse;font:10pt helvetica, arial, sans-serif;padding-bottom:2mm;width:100%}.gm-table,.gm-table th,.gm-table td{border:1px solid #ddd}.gm-table td{vertical-align:top}.gm-hd{color:#999;text-align:left;text-transform:uppercase}.gm-ticket-section{background-color:#999;display:inline-block;height:8px;line-height:0;overflow:hidden;position:relative;text-indent:-99em;width:12px}.gm-remove-ticket{background-color:#ccc}.gm-remove-ticket:hover{background-color:#e94902}.gm-remove-ticket:hover:after{color:white;content:"✖";display:inline-block;height:100%;left:0;line-height:0.5em;position:absolute;text-align:center;text-indent:10%;top:0;width:100%}.gm-warning{background-color:#e94902;color:white}.gm-warning .gm-hd{color:white}.gm-button-danger{color:#c00}.gm-label-danger,.gm-label-bug,.gm-label-user-story{background-color:#999;border-radius:0.2em;color:white;display:inline-block;font-weight:bold;line-height:1em;padding:4px 8px 2px}.gm-label-danger,.gm-label-bug{background-color:#c00}.gm-label-user-story{background-color:#8caf68}.gm-pick-more i{font-size:1.4em;font-style:normal;font-weight:bold;line-height:0}.gm-container .gm-print{margin:0 10px 0 0}.gm-output-list{margin:0;padding:0}.gm-output-item{-o-box-sizing:border-box;-ms-box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;height:12.2cm;overflow:hidden;page-break-inside:avoid;position:relative}.gm-output-item:nth-child(odd):before,.gm-output-item:nth-child(even):after{color:#999;display:block;font-size:0.8em;text-align:center}.gm-output-list{counter-reset:page-counter}.gm-output-item:nth-child(odd){counter-increment:page-counter}.gm-output-item:nth-child(odd):before{content:"Begin of page " counter(page-counter);margin-bottom:1em}.gm-output-item:nth-child(even){border-bottom:2px dashed #ddd}.gm-output-item:nth-child(even):after{content:"End of page " counter(page-counter);margin-top:1em}@media print{.gm-output-item:before,.gm-output-item:after{display:none}}.gm-inner{padding:2mm 3mm}.gm-jira-number .gm-bd{word-break:break-all}.gm-jira-title .gm-inner{overflow:hidden;padding-bottom:0;height:6.5cm}.gm-jira-pairing .gm-inner{overflow:hidden}.gm-jira-pairing .gm-hd{padding-right:3mm}.gm-jira-pairing .gm-bd{overflow:hidden}.gm-jira-qa .gm-bd{border-radius:2em;border:1px solid #ddd;height:40px;margin:auto;width:40px}.gm-date-content .gm-hd{padding:0 0 1px;text-align:center}.gm-date-content .gm-bd{color:#ddd;font-size:0.8em;text-align:center;text-transform:uppercase}.gm-date-content .gm-inner{min-height:1.2cm}.global .aui-message{left:50%;margin-left:-220px;position:absolute;top:20px;z-index:101}.gm-page-counter{color:#999;position:absolute;right:2em;top:2.2em}@media print{html,body{background-color:white}#page,.aui-blanket,#gm-add-collaborator{display:none}.gm-container.jira-dialog{border:none;margin:0;padding:0}.gm-container{box-shadow:none !important;border-radius:0 !important;left:0;margin:0;max-height:none;padding:0;position:absolute;top:0;width:100%}.gm-container .form-body{padding:0 !important}}@media screen{.gm-container{left:50%;margin-left:-9cm;margin-top:5%;top:0;width:18.9cm}.gm-container .form-body{height:460px;padding:2mm !important}.gm-ticket-action-panel{align-items:center;background-color:rgba(0,0,0,0.3);bottom:8.5em;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;justify-content:center;left:0;position:absolute;right:0;text-align:center;top:6.2em;transition:0.4s;opacity:0}.gm-output-item:hover .gm-ticket-action-panel{opacity:1}.gm-output-item:nth-child(even) .gm-ticket-action-panel{bottom:2.3em;top:0}.aui-button.gm-button-danger:hover{border-color:#8f3601}.aui-button.gm-pick-more:hover{border-color:#8caf68}}', xing.core.table.layout.SCRUM_LAYOUT);xingJiraApp.versionTimestamp="2014-01-13 6:13:55 PM";xingJiraApp.version="2.1.0";xingJiraApp.showPopup();})();