(function(e){var t;define([],function(){return function(){ko.utils.findMovesInArrayComparison=function(e,t,n){if(e.length&&t.length){var r,i,s,o,u;for(r=i=0;(!n||r<n)&&(o=e[i]);++i){for(s=0;u=t[s];++s)if(o.value===u.value){o.moved=u.index,u.moved=o.index,t.splice(s,1),r=s=0;break}r+=s}}},ko.utils.compareArrays=function(){function n(n,i,s){return s=typeof s=="boolean"?{dontLimitMoves:s}:s||{},n=n||[],i=i||[],n.length<=i.length?r(n,i,e,t,s):r(i,n,t,e,s)}function r(e,t,n,r,i){var s=Math.min,o=Math.max,u=[],a,f=e.length,l,c=t.length,h=c-f||1,p=f+c+1,d,v,m,g;for(a=0;a<=f;a++){v=d,u.push(d=[]),m=s(c,a+h),g=o(0,a-1);for(l=g;l<=m;l++)if(!l)d[l]=a+1;else if(!a)d[l]=l+1;else if(e[a-1]===t[l-1])d[l]=v[l-1];else{var y=v[l]||p,b=d[l-1]||p;d[l]=s(y,b)+1}}var w=[],E,S=[],x=[];for(a=f,l=c;a||l;)E=u[a][l]-1,l&&E===u[a][l-1]?S.push(w[w.length]={status:n,value:t[--l],index:l}):a&&E===u[a-1][l]?x.push(w[w.length]={status:r,value:e[--a],index:a}):(--l,--a,i.sparse||w.push({status:"retained",value:t[l]}));return ko.utils.findMovesInArrayComparison(S,x,f*10),w.reverse()}var e="added",t="deleted";return n}(),ko.exportSymbol("utils.compareArrays",ko.utils.compareArrays)}.call(e),t})})(this);