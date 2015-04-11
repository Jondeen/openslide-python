/*!
 * Version.js v0.2.0
 *
 * Test a different script version with the switch of a query string.
 *
 * https://github.com/jstayton/version.js
 *
 * Copyright 2013 by Justin Stayton
 * Licensed MIT
 */

(function(e){var t;define(["jquery"],function(n){return function(){(function(e,t){"use strict";var n={};n.CDN={cdnjs:"//cdnjs.cloudflare.com/ajax/libs/{{LIBRARY}}/{{VERSION}}/{{FILE}}.js",google:"//ajax.googleapis.com/ajax/libs/{{LIBRARY}}/{{VERSION}}/{{FILE}}.js",jsdelivr:"//cdn.jsdelivr.net/{{LIBRARY}}/{{VERSION}}/{{FILE}}.js"},n.queryVersion=function(t){var n=new RegExp("[&\\?]"+t+"=([^&]+)"),r=n.exec(e.location.search);return r&&r[1]},n.scriptUrl=function(t,r){var i=n.CDN[t]||t;return i?(i.substr(0,2)==="//"&&(i=(e.location.protocol==="https:"?"https:":"http:")+i),r&&(i=i.replace(/\{\{LIBRARY\}\}/,r.library),i=i.replace(/\{\{VERSION\}\}/,r.version),i=i.replace(/\{\{FILE\}\}/,r.file||r.library)),i):null},n.scriptString=function(e){return e&&'<script type="text/javascript" src="'+e+'"></script>'},n.writeScript=function(e){return e&&t.write(e)},n.selfScript=function(){var e=t.getElementsByTagName("script");return e[e.length-1]},n.selfScriptOptions=function(){var e=n.selfScript()||t.createElement("script");return{url:e.getAttribute("data-url"),library:e.getAttribute("data-lib"),version:e.getAttribute("data-ver"),file:e.getAttribute("data-file"),param:e.getAttribute("data-param")}},n.options=function(e){var t=e.param||"versionjs";return{url:e.url,library:e.library,version:n.queryVersion(t)||e.version,file:e.file,param:t}},n.load=function(e){var t=n.options(e),r=n.scriptUrl(t.url,t),i=n.scriptString(r);return n.writeScript(i)},n.load(n.selfScriptOptions()),e.version={load:n.load}})(window,document)}.call(e),t})})(this);