(function(e){var t;define([],function(){return function(){var e="arrayChange";ko.extenders.trackArrayChanges=function(t){function a(){if(n)return;n=!0;var o=t.notifySubscribers;t.notifySubscribers=function(e,t){return(!t||t===defaultEvent)&&++s,o.apply(this,arguments)};var u=[].concat(t.peek()||[]);r=null,i=t.subscribe(function(n){n=[].concat(n||[]);if(t.hasSubscriptionsForEvent(e))var i=f(u,n);u=n,r=null,s=0,i&&i.length&&t.notifySubscribers(i,e)})}function f(e,t){if(!r||s>1)r=ko.utils.compareArrays(e,t,{sparse:!0});return r}if(t.cacheDiffForKnownOperation)return;var n=!1,r=null,i,s=0,o=t.beforeSubscriptionAdd,u=t.afterSubscriptionRemove;t.beforeSubscriptionAdd=function(n){o&&o.call(t,n),n===e&&a()},t.afterSubscriptionRemove=function(r){u&&u.call(t,r),r===e&&!t.hasSubscriptionsForEvent(e)&&(i.dispose(),n=!1)},t.cacheDiffForKnownOperation=function(e,t,i){function l(e,t,n){return o[o.length]={status:e,value:t,index:n}}if(!n||s)return;var o=[],u=e.length,a=i.length,f=0;switch(t){case"push":f=u;case"unshift":for(var c=0;c<a;c++)l("added",i[c],f+c);break;case"pop":f=u-1;case"shift":u&&l("deleted",e[f],f);break;case"splice":var h=Math.min(Math.max(0,i[0]<0?u+i[0]:i[0]),u),p=a===1?u:Math.min(h+(i[1]||0),u),d=h+a-2,v=Math.max(p,d),m=[],g=[];for(var c=h,y=2;c<v;++c,++y)c<p&&g.push(l("deleted",e[c],c)),c<d&&m.push(l("added",i[y],c));ko.utils.findMovesInArrayComparison(g,m);break;default:return}r=o}}}.call(e),t})})(this);