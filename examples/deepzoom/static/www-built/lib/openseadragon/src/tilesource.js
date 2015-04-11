/*
 * OpenSeadragon - TileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(root){var amdExports;define([],function(){return function(){(function($){function processResponse(xhr){var responseText=xhr.responseText,status=xhr.status,statusText,data;if(!xhr)throw new Error($.getString("Errors.Security"));if(xhr.status!==200&&xhr.status!==0)throw status=xhr.status,statusText=status==404?"Not Found":xhr.statusText,new Error($.getString("Errors.Status",status,statusText));if(responseText.match(/\s*<.*/))try{data=xhr.responseXML&&xhr.responseXML.documentElement?xhr.responseXML:$.parseXml(responseText)}catch(e){data=xhr.responseText}else responseText.match(/\s*[\{\[].*/)?data=eval("("+responseText+")"):data=responseText;return data}$.TileSource=function(e,t,n,r,i,s){var o=null,u=arguments,a,f;$.isPlainObject(e)?a=e:a={width:u[0],height:u[1],tileSize:u[2],tileOverlap:u[3],minLevel:u[4],maxLevel:u[5]},$.EventSource.call(this),$.extend(!0,this,a);for(f=0;f<arguments.length;f++)if($.isFunction(arguments[f])){o=arguments[f],this.addHandler("ready",function(e){o(e)});break}"string"==$.type(arguments[0])?(this.aspectRatio=1,this.dimensions=new $.Point(10,10),this.tileSize=0,this.tileOverlap=0,this.minLevel=0,this.maxLevel=0,this.ready=!1,this.getImageInfo(arguments[0])):(this.ready=!0,this.aspectRatio=a.width&&a.height?a.width/a.height:1,this.dimensions=new $.Point(a.width,a.height),this.tileSize=a.tileSize?a.tileSize:0,this.tileOverlap=a.tileOverlap?a.tileOverlap:0,this.minLevel=a.minLevel?a.minLevel:0,this.maxLevel=undefined!==a.maxLevel&&null!==a.maxLevel?a.maxLevel:a.width&&a.height?Math.ceil(Math.log(Math.max(a.width,a.height))/Math.log(2)):0,o&&$.isFunction(o)&&o(this))},$.TileSource.prototype={getTileSize:function(e){return this.tileSize},getLevelScale:function(e){var t={},n;for(n=0;n<=this.maxLevel;n++)t[n]=1/Math.pow(2,this.maxLevel-n);return this.getLevelScale=function(e){return t[e]},this.getLevelScale(e)},getNumTiles:function(e){var t=this.getLevelScale(e),n=Math.ceil(t*this.dimensions.x/this.getTileSize(e)),r=Math.ceil(t*this.dimensions.y/this.getTileSize(e));return new $.Point(n,r)},getPixelRatio:function(e){var t=this.dimensions.times(this.getLevelScale(e)),n=1/t.x,r=1/t.y;return new $.Point(n,r)},getClosestLevel:function(e){var t,n,r;for(t=this.minLevel;t<this.maxLevel;t++){r=this.getNumTiles(t),n=Math.floor(Math.max(e.x,e.y)/this.getTileSize(t));if(Math.max(r.x,r.y)+1>=n)break}return Math.max(0,t-1)},getTileAtPoint:function(e,t){var n=t.times(this.dimensions.x).times(this.getLevelScale(e)),r=Math.floor(n.x/this.getTileSize(e)),i=Math.floor(n.y/this.getTileSize(e));return new $.Point(r,i)},getTileBounds:function(e,t,n){var r=this.dimensions.times(this.getLevelScale(e)),i=this.getTileSize(e),s=t===0?0:i*t-this.tileOverlap,o=n===0?0:i*n-this.tileOverlap,u=i+(t===0?1:2)*this.tileOverlap,a=i+(n===0?1:2)*this.tileOverlap,f=1/r.x;return u=Math.min(u,r.x-s),a=Math.min(a,r.y-o),new $.Rect(s*f,o*f,u*f,a*f)},getImageInfo:function(e){var t=this,n,r,i,s,o,u,a;e&&(o=e.split("/"),u=o[o.length-1],a=u.lastIndexOf("."),a>-1&&(o[o.length-1]=u.slice(0,a))),r=function(n){typeof n=="string"&&(n=$.parseXml(n));var r=$.TileSource.determineType(t,n,e);if(!r){t.raiseEvent("open-failed",{message:"Unable to load TileSource",source:e});return}s=r.prototype.configure.apply(t,[n,e]),i=new r(s),t.ready=!0,t.raiseEvent("ready",{tileSource:i})},e.match(/\.js$/)?(n=e.split("/").pop().replace(".js",""),$.jsonp({url:e,async:!1,callbackName:n,callback:r})):$.makeAjaxRequest(e,function(e){var t=processResponse(e);r(t)},function(n,r){var i;try{i="HTTP "+n.status+" attempting to load TileSource"}catch(s){var o;typeof r=="undefined"||!r.toString?o="Unknown error":o=r.toString(),i=o+" attempting to load TileSource"}t.raiseEvent("open-failed",{message:i,source:e})})},supports:function(e,t){return!1},configure:function(e,t){throw new Error("Method not implemented.")},getTileUrl:function(e,t,n){throw new Error("Method not implemented.")},tileExists:function(e,t,n){var r=this.getNumTiles(e);return e>=this.minLevel&&e<=this.maxLevel&&t>=0&&n>=0&&t<r.x&&n<r.y}},$.extend(!0,$.TileSource.prototype,$.EventSource.prototype),$.TileSource.determineType=function(e,t,n){var r;for(r in OpenSeadragon)if(r.match(/.+TileSource$/)&&$.isFunction(OpenSeadragon[r])&&$.isFunction(OpenSeadragon[r].prototype.supports)&&OpenSeadragon[r].prototype.supports.call(e,t,n))return OpenSeadragon[r];$.console.error("No TileSource was able to open %s %s",n,t)}})(OpenSeadragon)}.call(root),amdExports})})(this);