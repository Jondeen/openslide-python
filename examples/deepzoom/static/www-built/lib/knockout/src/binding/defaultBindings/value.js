(function(e){var t;define([],function(){return function(){ko.bindingHandlers.value={after:["options","foreach"],init:function(e,t,n){if(e.tagName.toLowerCase()=="input"&&(e.type=="checkbox"||e.type=="radio")){ko.applyBindingAccessorsToNode(e,{checkedValue:t});return}var r=["change"],i=n.get("valueUpdate"),s=!1,o=null;i&&(typeof i=="string"&&(i=[i]),ko.utils.arrayPushAll(r,i),r=ko.utils.arrayGetDistinctValues(r));var u=function(){o=null,s=!1;var r=t(),i=ko.selectExtensions.readValue(e);ko.expressionRewriting.writeValueToProperty(r,n,"value",i)},a=ko.utils.ieVersion&&e.tagName.toLowerCase()=="input"&&e.type=="text"&&e.autocomplete!="off"&&(!e.form||e.form.autocomplete!="off");a&&ko.utils.arrayIndexOf(r,"propertychange")==-1&&(ko.utils.registerEventHandler(e,"propertychange",function(){s=!0}),ko.utils.registerEventHandler(e,"focus",function(){s=!1}),ko.utils.registerEventHandler(e,"blur",function(){s&&u()})),ko.utils.arrayForEach(r,function(t){var n=u;ko.utils.stringStartsWith(t,"after")&&(n=function(){o=ko.selectExtensions.readValue(e),setTimeout(u,0)},t=t.substring("after".length)),ko.utils.registerEventHandler(e,t,n)});var f=function(){var r=ko.utils.unwrapObservable(t()),i=ko.selectExtensions.readValue(e);if(o!==null&&r===o){setTimeout(f,0);return}var s=r!==i;if(s)if(ko.utils.tagNameLower(e)==="select"){var u=n.get("valueAllowUnset"),a=function(){ko.selectExtensions.writeValue(e,r,u)};a(),!u&&r!==ko.selectExtensions.readValue(e)?ko.dependencyDetection.ignore(ko.utils.triggerEvent,null,[e,"change"]):setTimeout(a,0)}else ko.selectExtensions.writeValue(e,r)};ko.computed(f,null,{disposeWhenNodeIsRemoved:e})},update:function(){}},ko.expressionRewriting.twoWayBindings.value=!0}.call(e),t})})(this);