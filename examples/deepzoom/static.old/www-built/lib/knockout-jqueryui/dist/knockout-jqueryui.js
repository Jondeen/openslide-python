/*! knockout-jqueryui - v2.2.2 - 1/20/2015
* https://gvas.github.io/knockout-jqueryui/
* Copyright (c) 2015 Vas Gabor <gvas.munka@gmail.com> Licensed MIT */

(function(e){var t;define(["jquery","knockout","jquery-ui"],function(){return function(){window.kojqui={version:"2.2.2"},function(e,t){"use strict";e.kojqui.utils=t(e.jQuery,e.ko,e.jQuery.ui.core)}(this,function(e,t){"use strict";var n,r,i,s,o;return n=(e.ui.version||"").match(/^(\d)\.(\d+)/),n?r={major:parseInt(n[1],10),minor:parseInt(n[2],10)}:r=null,i=["foreach","if","ifnot","with","html","text","options"],s=Object.create||function(e){function t(){}return t.prototype=e,new t},o=function(e){var n=new e;t.bindingHandlers[n.widgetName]={after:t.utils.arrayGetDistinctValues(i.concat(n.after||[])),init:n.init.bind(n),update:n.update.bind(n)}},{uiVersion:r,descendantControllingBindings:i,createObject:s,register:o}}),function(e,t){"use strict";e.kojqui.BindingHandler=t(e.jQuery,e.ko,e.kojqui.utils,e.jQuery.ui.widget)}(this,function(e,t,n){"use strict";var r,i,s,o;return r="__kojqui_options",i=function(e,n){var r={};return t.utils.arrayForEach(n,function(n){e[n]!==undefined&&(r[n]=t.utils.unwrapObservable(e[n]))}),r},s=function(n,r,i){t.isObservable(i.refreshOn)&&t.computed({read:function(){i.refreshOn(),e(r)[n]("refresh")},disposeWhenNodeIsRemoved:r})},o=function(e){this.widgetName=e,this.widgetEventPrefix=e,this.options=[],this.events=[],this.after=[],this.hasRefresh=!1},o.prototype.init=function(o,u,a,f,l){var c,h,p,d,v;return c=this.widgetName,h=u(),p=i(h,this.options),d=i(h,this.events),v=!t.utils.arrayFirst(n.descendantControllingBindings,function(e){return this.hasOwnProperty(e)},a()),v&&t.applyBindingsToDescendants(l,o),t.utils.domData.set(o,r,p),e.each(d,function(e,t){d[e]=t.bind(f)}),e(o)[c](t.utils.extend(p,d)),this.hasRefresh&&s(c,o,h),t.isWriteableObservable(h.widget)&&h.widget(e(o)),t.utils.domNodeDisposal.addDisposeCallback(o,function(){e(o)[c]("destroy")}),{controlsDescendantBindings:v}},o.prototype.update=function(n,s){var o,u,a,f;o=this.widgetName,u=s(),a=t.utils.domData.get(n,r),f=i(u,this.options),e.each(f,function(t,r){r!==a[t]&&e(n)[o]("option",t,f[t])}),t.utils.domData.set(n,r,f)},o.prototype.on=function(n,r,i){var s;r===this.widgetEventPrefix?s=r:s=this.widgetEventPrefix+r,s=[s.toLowerCase(),".",this.widgetName].join(""),e(n).on(s,i),t.utils.domNodeDisposal.addDisposeCallback(n,function(){e(n).off(s)})},o}),function(e,t){"use strict";e.kojqui.Accordion=t(e.jQuery,e.ko,e.kojqui.utils,e.kojqui.BindingHandler,e.jQuery.ui.accordion)}(this,function(e,t,n,r){"use strict";var i=function(){r.call(this,"accordion"),n.uiVersion.major===1&&n.uiVersion.minor===8?(this.options=["active","animated","autoHeight","clearStyle","collapsible","disabled","event","fillSpace","header","icons","navigation","navigationFilter"],this.events=["change","changestart","create"],this.hasRefresh=!1,this.eventToWatch="change"):(this.options=["active","animate","collapsible","disabled","event","header","heightStyle","icons"],this.events=["activate","beforeActivate","create"],this.hasRefresh=!0,this.eventToWatch="activate")};return i.prototype=n.createObject(r.prototype),i.prototype.constructor=i,i.prototype.init=function(n,i){var s,o,u;return s=this.widgetName,o=i(),u=r.prototype.init.apply(this,arguments),t.isWriteableObservable(o.active)&&this.on(n,this.eventToWatch,function(){o.active(e(n)[s]("option","active"))}),u},n.register(i),i}),function(e,t){"use strict";e.kojqui.Autocomplete=t(e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.autocomplete)}(this,function(e,t){"use strict";var n=function(){e.call(this,"autocomplete"),this.options=["appendTo","autoFocus","delay","disabled","minLength","position","source"],t.uiVersion.major===1&&t.uiVersion.minor===8?this.events=["change","close","create","focus","open","search","select"]:(this.options.push("messages"),this.events=["change","close","create","focus","open","response","search","select"])};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n}),function(e,t){"use strict";e.kojqui.Button=t(e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.button)}(this,function(e,t){"use strict";var n=function(){e.call(this,"button"),this.options=["disabled","icons","label","text"],this.events=["create"],this.hasRefresh=!0};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n}),function(e,t){"use strict";e.kojqui.Buttonset=t(e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.button)}(this,function(e,t){"use strict";var n=function(){e.call(this,"buttonset"),this.options=["items","disabled"],this.events=["create"],this.hasRefresh=!0};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n}),function(e,t){"use strict";e.kojqui.Datepicker=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.datepicker)}(this,function(e,t,n,r){"use strict";var i=function(){n.call(this,"datepicker"),this.options=["altField","altFormat","appendText","autoSize","buttonImage","buttonImageOnly","buttonText","calculateWeek","changeMonth","changeYear","closeText","constrainInput","currentText","dateFormat","dayNames","dayNamesMin","dayNamesShort","defaultDate","duration","firstDay","gotoCurrent","hideIfNoPrevNext","isRTL","maxDate","minDate","monthNames","monthNamesShort","navigationAsDateFormat","nextText","numberOfMonths","prevText","selectOtherMonths","shortYearCutoff","showAnim","showButtonPanel","showCurrentAtPos","showMonthAfterYear","showOn","showOptions","showOtherMonths","showWeek","stepMonths","weekHeader","yearRange","yearSuffix","beforeShow","beforeShowDay","onChangeMonthYear","onClose","onSelect"],this.hasRefresh=!0};return i.prototype=r.createObject(n.prototype),i.prototype.constructor=i,i.prototype.init=function(r,i){var s,o,u,a,f,l;return s=n.prototype.init.apply(this,arguments),o=this.widgetName,u=i(),a=t.utils.unwrapObservable(u.value),a&&e(r)[o]("setDate",a),t.isObservable(u.value)&&(f=u.value.subscribe(function(t){e(r)[o]("setDate",t)}),t.utils.domNodeDisposal.addDisposeCallback(r,function(){f.dispose()})),t.isWriteableObservable(u.value)&&(l=e(r)[o]("option","onSelect"),e(r)[o]("option","onSelect",function(t){var n,i;n=e(r)[o]("option","dateFormat"),i=e.datepicker.parseDate(n,t),u.value(i),typeof l=="function"&&l.apply(this,Array.prototype.slice.call(arguments))})),s},r.register(i),i}),function(e,t){"use strict";e.kojqui.Dialog=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.dialog)}(this,function(e,t,n,r){"use strict";var i=function(){n.call(this,"dialog"),r.uiVersion.major===1&&r.uiVersion.minor===8?(this.options=["autoOpen","buttons","closeOnEscape","closeText","dialogClass","disabled","draggable","height","maxHeight","maxWidth","minHeight","minWidth","modal","position","resizable","show","stack","title","width","zIndex"],this.events=["beforeClose","create","open","focus","dragStart","drag","dragStop","resizeStart","resize","resizeStop","close"]):r.uiVersion.major===1&&r.uiVersion.minor===9?(this.options=["autoOpen","buttons","closeOnEscape","closeText","dialogClass","draggable","height","hide","maxHeight","maxWidth","minHeight","minWidth","modal","position","resizable","show","stack","title","width","zIndex"],this.events=["beforeClose","create","open","focus","dragStart","drag","dragStop","resizeStart","resize","resizeStop","close"]):(this.options=["appendTo","autoOpen","buttons","closeOnEscape","closeText","dialogClass","draggable","height","hide","maxHeight","maxWidth","minHeight","minWidth","modal","position","resizable","show","title","width"],this.events=["beforeClose","create","open","focus","dragStart","drag","dragStop","resizeStart","resize","resizeStop","close"])};return i.prototype=r.createObject(n.prototype),i.prototype.constructor=i,i.prototype.init=function(r,i){var s,o,u;return s=document.createElement("DIV"),s.style.display="none",r.parentNode.insertBefore(s,r),t.utils.domNodeDisposal.addDisposeCallback(s,function(){t.removeNode(r)}),o=n.prototype.init.apply(this,arguments),u=i(),u.isOpen&&t.computed({read:function(){t.utils.unwrapObservable(u.isOpen)?e(r)[this.widgetName]("open"):e(r)[this.widgetName]("close")},disposeWhenNodeIsRemoved:r,owner:this}),t.isWriteableObservable(u.isOpen)&&(this.on(r,"open",function(){u.isOpen(!0)}),this.on(r,"close",function(){u.isOpen(!1)})),t.isWriteableObservable(u.width)&&this.on(r,"resizestop",function(e,t){u.width(Math.round(t.size.width))}),t.isWriteableObservable(u.height)&&this.on(r,"resizestop",function(e,t){u.height(Math.round(t.size.height))}),o},r.register(i),i}),function(e,t){"use strict";e.kojqui.Menu=t(e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.menu)}(this,function(e,t){"use strict";var n=function(){e.call(this,"menu"),t.uiVersion.major===1&&t.uiVersion.minor<11?this.options=["disabled","icons","menus","position","role"]:this.options=["disabled","icons","items","menus","position","role"],this.events=["blur","create","focus","select"],this.hasRefresh=!0};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n}),function(e,t){"use strict";e.kojqui.Progressbar=t(e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.progressbar)}(this,function(e,t){"use strict";var n=function(){e.call(this,"progressbar"),this.events=["change","create","complete"],this.hasRefresh=!0,t.uiVersion.major===1&&t.uiVersion.minor===8?this.options=["disabled","value"]:this.options=["disabled","max","value"]};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n}),function(e,t){"use strict";e.kojqui.Selectmenu=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.selectmenu)}(this,function(e,t,n,r){"use strict";var i,s;return i="__kojqui_selectmenu_value",s=function(){n.call(this,"selectmenu"),this.after=["value"],this.options=["appendTo","disabled","icons","position","width"],this.events=["change","close","create","focus","open","select"],this.hasRefresh=!0},s.prototype=r.createObject(n.prototype),s.prototype.constructor=s,s.prototype.init=function(r,i){var s,o;return s=i(),o=n.prototype.init.apply(this,arguments),s.hasOwnProperty("isOpen")&&t.computed({read:function(){t.utils.unwrapObservable(s.isOpen)?e(r)[this.widgetName]("open"):e(r)[this.widgetName]("close")},disposeWhenNodeIsRemoved:r,owner:this}),t.isWriteableObservable(s.isOpen)&&(this.on(r,"open",function(){s.isOpen(!0)}),this.on(r,"close",function(){s.isOpen(!1)})),this.on(r,"change",function(){e(r).trigger("change")}),o},s.prototype.update=function(r,s,o){var u,a;n.prototype.update.apply(this,arguments),o().hasOwnProperty("value")&&(u=t.utils.domData.get(r,i),a=t.utils.unwrapObservable(o().value),u!==a&&e(r).selectmenu("refresh"))},r.register(s),s}),function(e,t){"use strict";e.kojqui.Slider=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.slider)}(this,function(e,t,n,r){"use strict";var i,s;return i="__kojqui_options",s=function(){n.call(this,"slider"),this.widgetEventPrefix="slide",this.options=["animate","disabled","max","min","orientation","range","step","value","values"],this.events=["create","start","slide","change","stop"]},s.prototype=r.createObject(n.prototype),s.prototype.constructor=s,s.prototype.init=function(r,s){var o,u,a;return o=n.prototype.init.apply(this,arguments),u=s(),a=u.realtime?"slide":"change",t.isWriteableObservable(u.value)&&this.on(r,a,function(n,s){var o=e(r).find(".ui-slider-handle").index(s.handle);o===0&&(t.utils.domData.get(r,i).value=s.value,u.value(s.value))}),t.isWriteableObservable(u.values)&&this.on(r,a,function(e,n){t.utils.domData.get(r,i).value=n.values,u.values(n.values)}),o},r.register(s),s}),function(e,t){"use strict";e.kojqui.Spinner=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.spinner)}(this,function(e,t,n,r){"use strict";var i=function(){n.call(this,"spinner"),this.widgetEventPrefix="spin",this.options=["culture","disabled","icons","incremental","max","min","numberFormat","page","step"],this.events=["create","start","spin","stop","change"]};return i.prototype=r.createObject(n.prototype),i.prototype.constructor=i,i.prototype.init=function(r,i,s){var o,u,a;return o=n.prototype.init.apply(this,arguments),u=this.widgetName,a=i(),a.value&&t.computed({read:function(){e(r)[u]("value",t.utils.unwrapObservable(a.value))},disposeWhenNodeIsRemoved:r}),t.isWriteableObservable(a.value)&&(s().valueUpdate?this.on(r,"spin",function(e,t){a.value(t.value)}):this.on(r,"change",function(){a.value(e(r)[u]("value"))})),o},r.register(i),i}),function(e,t){"use strict";e.kojqui.Tabs=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.tabs)}(this,function(e,t,n,r){"use strict";var i,s,o;return i=function(n,r){var i=r();t.isWriteableObservable(i.selected)&&this.on(n,"show",function(t,r){e(n)[0]===t.target&&i.selected(r.index)})},s=function(n,r){var i=r();t.isWriteableObservable(i.active)&&this.on(n,"activate",function(t,r){e(n)[0]===t.target&&i.active(r.newTab.index())})},o=function(){n.call(this,"tabs"),this.version=r.uiVersion,this.version.major===1&&this.version.minor===8?(this.options=["ajaxOptions","cache","collapsible","cookie","disabled","event","fx","idPrefix","panelTemplate","selected","spinner","tabTemplate"],this.events=["add","create","disable","enable","load","remove","select","show"],this.hasRefresh=!1):(this.options=["active","collapsible","disabled","event","heightStyle","hide","show"],this.events=["activate","beforeActivate","beforeLoad","create","load"],this.hasRefresh=!0)},o.prototype=r.createObject(n.prototype),o.prototype.constructor=o,o.prototype.init=function(e,t){var r=n.prototype.init.apply(this,arguments);return this.version.major===1&&this.version.minor===8?i.call(this,e,t):s.call(this,e,t),r},r.register(o),o}),function(e,t){"use strict";e.kojqui.Tooltip=t(e.jQuery,e.ko,e.kojqui.BindingHandler,e.kojqui.utils,e.jQuery.ui.tooltip)}(this,function(e,t,n,r){"use strict";var i=function(){n.call(this,"tooltip"),this.options=["content","disabled","hide","items","position","show","tooltipClass","track"],this.events=["create","open","close"]};return i.prototype=r.createObject(n.prototype),i.prototype.constructor=i,i.prototype.init=function(r,i){var s,o;return s=i(),o=n.prototype.init.apply(this,arguments),s.isOpen&&t.computed({read:function(){t.utils.unwrapObservable(s.isOpen)?e(r)[this.widgetName]("open"):e(r)[this.widgetName]("close")},disposeWhenNodeIsRemoved:r,owner:this}),t.isWriteableObservable(s.isOpen)&&(this.on(r,"open",function(){s.isOpen(!0)}),this.on(r,"close",function(){s.isOpen(!1)})),o},r.register(i),i})}.call(e),t})})(this);