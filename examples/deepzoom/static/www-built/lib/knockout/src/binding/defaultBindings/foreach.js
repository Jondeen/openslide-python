(function(e){var t;define([],function(){return function(){ko.bindingHandlers.foreach={makeTemplateValueAccessor:function(e){return function(){var t=e(),n=ko.utils.peekObservable(t);return!n||typeof n.length=="number"?{foreach:t,templateEngine:ko.nativeTemplateEngine.instance}:(ko.utils.unwrapObservable(t),{foreach:n.data,as:n.as,includeDestroyed:n.includeDestroyed,afterAdd:n.afterAdd,beforeRemove:n.beforeRemove,afterRender:n.afterRender,beforeMove:n.beforeMove,afterMove:n.afterMove,templateEngine:ko.nativeTemplateEngine.instance})}},init:function(e,t,n,r,i){return ko.bindingHandlers.template.init(e,ko.bindingHandlers.foreach.makeTemplateValueAccessor(t))},update:function(e,t,n,r,i){return ko.bindingHandlers.template.update(e,ko.bindingHandlers.foreach.makeTemplateValueAccessor(t),n,r,i)}},ko.expressionRewriting.bindingRewriteValidators.foreach=!1,ko.virtualElements.allowedBindings.foreach=!0}.call(e),t})})(this);