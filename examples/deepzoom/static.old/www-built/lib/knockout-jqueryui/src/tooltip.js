define(["jquery","knockout","./bindingHandler","./utils","jquery-ui/tooltip"],function(e,t,n,r){"use strict";var i=function(){n.call(this,"tooltip"),this.options=["content","disabled","hide","items","position","show","tooltipClass","track"],this.events=["create","open","close"]};return i.prototype=r.createObject(n.prototype),i.prototype.constructor=i,i.prototype.init=function(r,i){var s,o;return s=i(),o=n.prototype.init.apply(this,arguments),s.isOpen&&t.computed({read:function(){t.utils.unwrapObservable(s.isOpen)?e(r)[this.widgetName]("open"):e(r)[this.widgetName]("close")},disposeWhenNodeIsRemoved:r,owner:this}),t.isWriteableObservable(s.isOpen)&&(this.on(r,"open",function(){s.isOpen(!0)}),this.on(r,"close",function(){s.isOpen(!1)})),o},r.register(i),i});