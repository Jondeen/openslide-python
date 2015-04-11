define(["jquery","knockout","./utils","jquery-ui/widget"],function(e,t,n){"use strict";var r,i,s,o;return r="__kojqui_options",i=function(e,n){var r={};return t.utils.arrayForEach(n,function(n){e[n]!==undefined&&(r[n]=t.utils.unwrapObservable(e[n]))}),r},s=function(n,r,i){t.isObservable(i.refreshOn)&&t.computed({read:function(){i.refreshOn(),e(r)[n]("refresh")},disposeWhenNodeIsRemoved:r})},o=function(e){this.widgetName=e,this.widgetEventPrefix=e,this.options=[],this.events=[],this.after=[],this.hasRefresh=!1},o.prototype.init=function(o,u,a,f,l){var c,h,p,d,v;return c=this.widgetName,h=u(),p=i(h,this.options),d=i(h,this.events),v=!t.utils.arrayFirst(n.descendantControllingBindings,function(e){return this.hasOwnProperty(e)},a()),v&&t.applyBindingsToDescendants(l,o),t.utils.domData.set(o,r,p),e.each(d,function(e,t){d[e]=t.bind(f)}),e(o)[c](t.utils.extend(p,d)),this.hasRefresh&&s(c,o,h),t.isWriteableObservable(h.widget)&&h.widget(e(o)),t.utils.domNodeDisposal.addDisposeCallback(o,function(){e(o)[c]("destroy")}),{controlsDescendantBindings:v}},o.prototype.update=function(n,s){var o,u,a,f;o=this.widgetName,u=s(),a=t.utils.domData.get(n,r),f=i(u,this.options),e.each(f,function(t,r){r!==a[t]&&e(n)[o]("option",t,f[t])}),t.utils.domData.set(n,r,f)},o.prototype.on=function(n,r,i){var s;r===this.widgetEventPrefix?s=r:s=this.widgetEventPrefix+r,s=[s.toLowerCase(),".",this.widgetName].join(""),e(n).on(s,i),t.utils.domNodeDisposal.addDisposeCallback(n,function(){e(n).off(s)})},o});