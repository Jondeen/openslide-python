define(["./bindingHandler","./utils","jquery-ui/menu"],function(e,t){"use strict";var n=function(){e.call(this,"menu"),t.uiVersion.major===1&&t.uiVersion.minor<11?this.options=["disabled","icons","menus","position","role"]:this.options=["disabled","icons","items","menus","position","role"],this.events=["blur","create","focus","select"],this.hasRefresh=!0};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n});