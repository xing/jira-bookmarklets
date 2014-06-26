# JIRA Bookmarklets v2.2.2 [![Build Status](https://travis-ci.org/#{author}/#{projectname}.png?branch=master)](https://travis-ci.org/#{author}/#{projectname})

This is a collection of client side script helpers.
The helper gives you the possibility to print your JIRA Issues/Tickets.
This helpers provides 2 different print layouts a default and a scrum one.

## Bookmarklet installation

1. Pick one of this scripts and copy the content of this script
2. Create an new bookmark in your browser
3. Enter a for you understandable name as a title
4. Paste the script in the Location field and save it
5. Then you can go on a JIRA ticket page and click the bookmarklet and magic will happen.

### Bookmarklets via SDK loader

SDK loading has the advantage a stress-free update. New versions are automatically updated.

Print out your JIRA tickets – *default layout*

``` javascript
javascript:(function(options){!function(a){"use strict";a=a||{},a.kit=a.kit||0,a.env=a.env||0,a.path=a.path||"//rawgit.com/#{author}/#{projectname}/";var b=document,c=b.createElement("script"),d=["master","develop"],e=["ticket-print","add-ticket","ticket-print-lay-scrum","add-ticket-lay-scrum"],f=d[a.env],g=e[a.kit],h=a.path+f+"/build/"+g+"-bookmarklet.js";c.setAttribute("src",h),b.head.appendChild(c)}(options);}());
```

Print out your JIRA tickets – *scrum layout*

``` javascript
javascript:(function(options){!function(a){"use strict";a=a||{},a.kit=a.kit||0,a.env=a.env||0,a.path=a.path||"//rawgit.com/#{author}/#{projectname}/";var b=document,c=b.createElement("script"),d=["master","develop"],e=["ticket-print","add-ticket","ticket-print-lay-scrum","add-ticket-lay-scrum"],f=d[a.env],g=e[a.kit],h=a.path+f+"/build/"+g+"-bookmarklet.js";c.setAttribute("src",h),b.head.appendChild(c)}(options);}({kit:2}));
```

Pick a JIRA ticket for print – *default layout*

``` javascript
javascript:(function(options){!function(a){"use strict";a=a||{},a.kit=a.kit||0,a.env=a.env||0,a.path=a.path||"//rawgit.com/#{author}/#{projectname}/";var b=document,c=b.createElement("script"),d=["master","develop"],e=["ticket-print","add-ticket","ticket-print-lay-scrum","add-ticket-lay-scrum"],f=d[a.env],g=e[a.kit],h=a.path+f+"/build/"+g+"-bookmarklet.js";c.setAttribute("src",h),b.head.appendChild(c)}(options);}({kit:1}));
```

Pick a JIRA ticket for print – *scrum layout*

``` javascript
javascript:(function(options){!function(a){"use strict";a=a||{},a.kit=a.kit||0,a.env=a.env||0,a.path=a.path||"//rawgit.com/#{author}/#{projectname}/";var b=document,c=b.createElement("script"),d=["master","develop"],e=["ticket-print","add-ticket","ticket-print-lay-scrum","add-ticket-lay-scrum"],f=d[a.env],g=e[a.kit],h=a.path+f+"/build/"+g+"-bookmarklet.js";c.setAttribute("src",h),b.head.appendChild(c)}(options);}({kit:3}));
```

## FAQ

**Why is the printed ticket black/white and not colored, as in the preview?**

You have to allow to print background colors in your browser print settings

- in Firefox: *Appearance: Print Color Backgrounds*
- in Google Chrome: *Options: Background colors and -images*


## Project setup

The build process based on [node.js](nodejs) please make sure you have a
nodejs (>=0.8.2) installed.

### Install build environment

Run this commands in the terminal to fetch all dependencies.

``` bash
$ npm install
$ bower install
```

### Run build script

The build process based on [Grunt](gruntjs). You can find the configuration in
the `Grundfile.js`.

If you will run on you machine you have to install it globaly

``` bash
$ npm install grunt-cli -g
```

Run theses following command in the terminal for:

_create the new compressed JavaScript and CSS resources_

``` bash
$ grunt build
```

_run tests_

``` bash
$ grunt test
```

_watch resources and run tests continuously_

``` bash
$ grunt watch
```

_generate documentation_

``` bash
$ grunt yuidoc
```

### Available Layouts

<img src="screenshots/default-layout-example.png"><br>
Default layout

<img src="screenshots/scrum-layout-example.png"><br>
Scrum layout

**How to create a new print layout?**

1. Define a new item in the `xing.core.table.layout` object.
   - requires a multi dimensional array `_layout` object like the existing (e.g. `kanban`)
   - requires a static item the represent the new layout (e.g. `KANBAN_LAYOUT: 'kanban'`)
2. Define the Grunt task in the Gruntfile.js to generate resources:

``` javascript
addBookmarkletKanban: {
  options: {
    banner: appConfig.templates.banner(),
    footer: appConfig.templates.addPluginFooter('xing.core.table.layout.KANBAN_LAYOUT')
  },
  files: {
    'build/add-ticket-lay-kanban-bookmarklet.js': appConfig.src
  }
}
```

3. Register layout in SDK loader script
   - add the layout name in the `kits` list e.g. `'ticket-print-lay-kanban'`

4. Run `grunt build` to create the resources and commit it and push it to your repository.

5. Create a bookmark with the new generated content from [build/sdk-loader.js](build/sdk-loader.js) as _Location URL_ and set the index number of the kit that you want to use at the end of the line:
   `…(options);}({ kit: 4, path: '//path.to.your/repository/jira-bookmarklets/raw/' }));`

6. The bookmarklet should now work on your JIRA issue pages.

#### Config

For changing the base request path for fetching the remote resources you can
adjust this in the `src/config.json` file.

[nodejs]:http://nodejs.org
[gruntjs]:http://gruntjs.com

## Release notes

### Version 2

**v2.2.2**

- Fix MIME type issue to make the JS executable all supported browser
- Improve the balance of title/description viewport size for the Scrum layout

**v2.2.1**

- *Scrum layout* support formatted text for the description
- document how to use bookmarklet with direct loading insteat of async loading via SDK loader script

**v2.2.0**

- allow to create several ticket layouts
- simplify scrum layout

**v2.1.0**

- make it possible to have different print ticket layouts
- two different layouts are now available:
  - [default](screenshots/default-layout-example.png)
  - [scrum](screenshots/scrum-layout-example.png) that shows story points

**v2.0.0**

- Load JavaScript from server/implement auto-update mechanism [Issue 3](https://rawgit.com/#{author}/#{projectname}/issues/3)
  * you don’t have to update your local bookmarklet anymore, we will do it for you \o/
- Print Multiple tickets [Issue 2](https://rawgit.com/#{author}/#{projectname}/issues/2)
  * Improve ticket prints - 2 tickets should now fits on one page
- Update markup for JIRA 6.*
- Overhaul remove a ticket interaction
- Update ticket view layout

### Version 1

**v1.3.0**

- Cleanup ticket layout (drop unnecessary fields)
- Drop toggle bookmark

**v1.2.1**

- Fix broken print layout

**v1.2.0**

- Make it possible to print out multiple tickets on one time
- Add a bookmarklet to pick up a ticket - for multiple ticket - without showing the print dialog

**v1.1.0**

- Make it possible to add/edit collaborators on the fly
- Bookmarklet for toggle additional lists int the backlog view

**v1.0.0**

- Bookmarklet to print formatted JIRA ticket

## Contact

XING AG

- https://github.com/#{author}
- https://github.com/xing
- https://twitter.com/xingdevs
- https://dev.xing.com

## License

XING print bookmarklet is available under the MIT license. See the [LICENSE](/#{author}/#{projectname}/blob/master/LICENSE) file for more info.
