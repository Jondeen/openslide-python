(function(e){var t;define([],function(){return function(){ko.bindingHandlers.submit={init:function(e,t,n,r,i){if(typeof t()!="function")throw new Error("The value for a submit binding must be a function");ko.utils.registerEventHandler(e,"submit",function(n){var r,s=t();try{r=s.call(i.$data,e)}finally{r!==!0&&(n.preventDefault?n.preventDefault():n.returnValue=!1)}})}}}.call(e),t})})(this);