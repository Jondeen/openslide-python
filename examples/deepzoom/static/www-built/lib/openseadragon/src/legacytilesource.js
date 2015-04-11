/*
 * OpenSeadragon - LegacyTileSource
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

(function(e){var t;define([],function(){return function(){(function(e){function t(t){var n=[],r,i;for(i=0;i<t.length;i++)r=t[i],r.height&&r.width&&r.url&&(r.url.toLowerCase().match(/^.*\.(png|jpg|jpeg|gif)$/)||r.mimetype&&r.mimetype.toLowerCase().match(/^.*\/(png|jpg|jpeg|gif)$/))?n.push({url:r.url,width:Number(r.width),height:Number(r.height)}):e.console.error("Unsupported image format: %s",r.url?r.url:"<no URL>");return n.sort(function(e,t){return e.height-t.height})}function n(t,n){if(!n||!n.documentElement)throw new Error(e.getString("Errors.Xml"));var i=n.documentElement,s=i.tagName,o=null,u=[],a,f;if(s=="image")try{o={type:i.getAttribute("type"),levels:[]},u=i.getElementsByTagName("level");for(f=0;f<u.length;f++)a=u[f],o.levels.push({url:a.getAttribute("url"),width:parseInt(a.getAttribute("width"),10),height:parseInt(a.getAttribute("height"),10)});return r(t,o)}catch(l){throw l instanceof Error?l:new Error("Unknown error parsing Legacy Image Pyramid XML.")}else{if(s=="collection")throw new Error("Legacy Image Pyramid Collections not yet supported.");if(s=="error")throw new Error("Error: "+n)}throw new Error("Unknown element "+s)}function r(e,t){return t.levels}e.LegacyTileSource=function(n){var r,i,s;e.isArray(n)&&(r={type:"legacy-image-pyramid",levels:n}),r.levels=t(r.levels),r.levels.length>0?(i=r.levels[r.levels.length-1].width,s=r.levels[r.levels.length-1].height):(i=0,s=0,e.console.error("No supported image formats found")),e.extend(!0,r,{width:i,height:s,tileSize:Math.max(s,i),tileOverlap:0,minLevel:0,maxLevel:r.levels.length>0?r.levels.length-1:0}),e.TileSource.apply(this,[r]),this.levels=r.levels},e.extend(e.LegacyTileSource.prototype,e.TileSource.prototype,{supports:function(e,t){return e.type&&"legacy-image-pyramid"==e.type||e.documentElement&&"legacy-image-pyramid"==e.documentElement.getAttribute("type")},configure:function(t,i){var s;return e.isPlainObject(t)?s=r(this,t):s=n(this,t),s},getLevelScale:function(e){var t=NaN;return this.levels.length>0&&e>=this.minLevel&&e<=this.maxLevel&&(t=this.levels[e].width/this.levels[this.maxLevel].width),t},getNumTiles:function(t){var n=this.getLevelScale(t);return n?new e.Point(1,1):new e.Point(0,0)},getTileAtPoint:function(t,n){return new e.Point(0,0)},getTileUrl:function(e,t,n){var r=null;return this.levels.length>0&&e>=this.minLevel&&e<=this.maxLevel&&(r=this.levels[e].url),r}})})(OpenSeadragon)}.call(e),t})})(this);