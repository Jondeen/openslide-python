define(["./bindingHandler","./utils","jquery-ui/button"],function(e,t){"use strict";var n=function(){e.call(this,"buttonset"),this.options=["items","disabled"],this.events=["create"],this.hasRefresh=!0};return n.prototype=t.createObject(e.prototype),n.prototype.constructor=n,t.register(n),n});