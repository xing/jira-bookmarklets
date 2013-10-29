# Jira Helpers

This is a summary of client side script helpers.
It exist 2 bookmarklets that improve your Jira workflow.

## Bookmarklet installation

1. Pick one of this scripts and copy the content of this script
2. Create an new bookmark in your browser
3. Enter a for you understandable name as a title
4. Paste the script in the Location field and save it
5. Then you can go on a JIRA ticket page and click the bookmarklet and magic will happen.

**Print out your Jira tickets**

``` javascript
javascript:(function(options){!function(a){"use strict";a=a||{},a.kit=a.kit||0,a.env=a.env||0,a.path=a.path||"//source.xing.com/xws/jira-helpers/raw/";var b=document,c=b.createElement("script"),d=["master","develop"],e=["ticket-print","add-ticket"],f=d[a.env],g=e[a.kit],h=a.path+f+"/output/"+g+"-bookmarklet.js";c.setAttribute("src",h),b.head.appendChild(c)}(options);}());
```

**Pick a Jira ticket for print**

``` javascript
javascript:(function(options){!function(a){"use strict";a=a||{},a.kit=a.kit||0,a.env=a.env||0,a.path=a.path||"//source.xing.com/xws/jira-helpers/raw/";var b=document,c=b.createElement("script"),d=["master","develop"],e=["ticket-print","add-ticket"],f=d[a.env],g=e[a.kit],h=a.path+f+"/output/"+g+"-bookmarklet.js";c.setAttribute("src",h),b.head.appendChild(c)}(options);}({kit:1}));
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

Run this command in the terminal to download the dependencies.

``` bash
$ npm install
```

### Run build script

The build process based on [Grunt](gruntjs). You can find the configuration in
the `Grundfile.js`.

Run this command in the terminal for create the new compressed resources.

``` bash
$ grunt
```

#### Config

For changing the base request path for fetching the remote resources you can
adjust this in the `src/config.json` file.

[nodejs]:http://nodejs.org
[gruntjs]:http://gruntjs.com

## Release notes

### Version 2

**v2.0.0**

- Load JavaScript from server/implement auto-update mechanism [Issue 3](https://source.xing.com/xws/jira-helpers/issues/3)
  * you don't have to update your local bookmarklet anymore, we will do it for you \o/
- Print Multiple tickets [Issue 2](https://source.xing.com/xws/jira-helpers/issues/2)
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

- Bookmarklet to print formatted Jira ticket

## Contact

XING AG

- https://github.com/xing
- https://twitter.com/xingdevs
- https://dev.xing.com

## License

XNGAPIClient is available under the MIT license. See the LICENSE file for more info.
