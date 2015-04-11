/*
 * OpenSeadragon - DziTileSource
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

(function(e){var t;define([],function(){return function(){(function(e){function t(t,r){if(!r||!r.documentElement)throw new Error(e.getString("Errors.Xml"));var i=r.documentElement,s=i.localName||i.tagName,o=r.documentElement.namespaceURI,u=null,a=[],f,l,c,h,p;if(s=="Image")try{h=i.getElementsByTagName("Size")[0],h===undefined&&(h=i.getElementsByTagNameNS(o,"Size")[0]),u={Image:{xmlns:"http://schemas.microsoft.com/deepzoom/2008",Url:i.getAttribute("Url"),Format:i.getAttribute("Format"),DisplayRect:null,Overlap:parseInt(i.getAttribute("Overlap"),10),TileSize:parseInt(i.getAttribute("TileSize"),10),Size:{Height:parseInt(h.getAttribute("Height"),10),Width:parseInt(h.getAttribute("Width"),10)}}};if(!e.imageFormatSupported(u.Image.Format))throw new Error(e.getString("Errors.ImageFormat",u.Image.Format.toUpperCase()));f=i.getElementsByTagName("DisplayRect"),f===undefined&&(f=i.getElementsByTagNameNS(o,"DisplayRect")[0]);for(p=0;p<f.length;p++)l=f[p],c=l.getElementsByTagName("Rect")[0],c===undefined&&(c=l.getElementsByTagNameNS(o,"Rect")[0]),a.push({Rect:{X:parseInt(c.getAttribute("X"),10),Y:parseInt(c.getAttribute("Y"),10),Width:parseInt(c.getAttribute("Width"),10),Height:parseInt(c.getAttribute("Height"),10),MinLevel:parseInt(l.getAttribute("MinLevel"),10),MaxLevel:parseInt(l.getAttribute("MaxLevel"),10)}});return a.length&&(u.Image.DisplayRect=a),n(t,u)}catch(d){throw d instanceof Error?d:new Error(e.getString("Errors.Dzi"))}else{if(s=="Collection")throw new Error(e.getString("Errors.Dzc"));if(s=="Error")return e._processDZIError(i)}throw new Error(e.getString("Errors.Dzi"))}function n(t,n){var r=n.Image,i=r.Url,s=r.Format,o=r.Size,u=r.DisplayRect||[],a=parseInt(o.Width,10),f=parseInt(o.Height,10),l=parseInt(r.TileSize,10),c=parseInt(r.Overlap,10),h=[],p,d;for(d=0;d<u.length;d++)p=u[d].Rect,h.push(new e.DisplayRect(parseInt(p.X,10),parseInt(p.Y,10),parseInt(p.Width,10),parseInt(p.Height,10),parseInt(p.MinLevel,10),parseInt(p.MaxLevel,10)));return e.extend(!0,{width:a,height:f,tileSize:l,tileOverlap:c,minLevel:null,maxLevel:null,tilesUrl:i,fileFormat:s,displayRects:h},n)}e.DziTileSource=function(t,n,r,i,s,o,u,a,f){var l,c,h,p;e.isPlainObject(t)?p=t:p={width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4],fileFormat:arguments[5],displayRects:arguments[6],minLevel:arguments[7],maxLevel:arguments[8]},this._levelRects={},this.tilesUrl=p.tilesUrl,this.fileFormat=p.fileFormat,this.displayRects=p.displayRects;if(this.displayRects)for(l=this.displayRects.length-1;l>=0;l--){c=this.displayRects[l];for(h=c.minLevel;h<=c.maxLevel;h++)this._levelRects[h]||(this._levelRects[h]=[]),this._levelRects[h].push(c)}e.TileSource.apply(this,[p])},e.extend(e.DziTileSource.prototype,e.TileSource.prototype,{supports:function(e,t){var n;return e.Image?n=e.Image.xmlns:e.documentElement&&("Image"==e.documentElement.localName||"Image"==e.documentElement.tagName)&&(n=e.documentElement.namespaceURI),"http://schemas.microsoft.com/deepzoom/2008"==n||"http://schemas.microsoft.com/deepzoom/2009"==n},configure:function(r,i){var s;return e.isPlainObject(r)?s=n(this,r):s=t(this,r),i&&!s.tilesUrl&&(s.tilesUrl=i.replace(/([^\/]+)\.(dzi|xml|js)(\?.*|$)/,"$1_files/"),i.search(/\.(dzi|xml|js)\?/)!=-1?s.queryParams=i.match(/\?.*/):s.queryParams=""),s},getTileUrl:function(e,t,n){return[this.tilesUrl,e,"/",t,"_",n,".",this.fileFormat,this.queryParams].join("")},tileExists:function(e,t,n){var r=this._levelRects[e],i,s,o,u,a,f,l;if(!r||!r.length)return!0;for(l=r.length-1;l>=0;l--){i=r[l];if(e<i.minLevel||e>i.maxLevel)continue;s=this.getLevelScale(e),o=i.x*s,u=i.y*s,a=o+i.width*s,f=u+i.height*s,o=Math.floor(o/this.tileSize),u=Math.floor(u/this.tileSize),a=Math.ceil(a/this.tileSize),f=Math.ceil(f/this.tileSize);if(o<=t&&t<a&&u<=n&&n<f)return!0}return!1}})})(OpenSeadragon)}.call(e),t})})(this);