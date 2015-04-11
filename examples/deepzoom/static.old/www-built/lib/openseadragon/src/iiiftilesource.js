/*
 * OpenSeadragon - IIIFTileSource
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

(function(e){var t;define([],function(){return function(){(function(e){function t(t){if(!t||!t.documentElement)throw new Error(e.getString("Errors.Xml"));var r=t.documentElement,i=r.tagName,s=null;if(i=="info")try{return s={},n(r,s),s}catch(o){throw o instanceof Error?o:new Error(e.getString("Errors.IIIF"))}throw new Error(e.getString("Errors.IIIF"))}function n(t,r,i){var s,o;if(t.nodeType==3&&i)o=t.nodeValue.trim(),o.match(/^\d*$/)&&(o=Number(o)),r[i]?(e.isArray(r[i])||(r[i]=[r[i]]),r[i].push(o)):r[i]=o;else if(t.nodeType==1)for(s=0;s<t.childNodes.length;s++)n(t.childNodes[s],r,t.nodeName)}e.IIIFTileSource=function(t){e.extend(!0,this,t);if(!(this.height&&this.width&&this["@id"]))throw new Error("IIIF required parameters not provided.");t.tileSizePerScaleFactor={};if(this.tile_width)t.tileSize=this.tile_width;else if(this.tile_height)t.tileSize=this.tile_height;else if(this.tiles)if(this.tiles.length==1)t.tileSize=this.tiles[0].width,this.scale_factors=this.tiles[0].scaleFactors;else{this.scale_factors=[];for(var n=0;n<this.tiles.length;n++)for(var r=0;r<this.tiles[n].scaleFactors.length;r++){var i=this.tiles[n].scaleFactors[r];this.scale_factors.push(i),t.tileSizePerScaleFactor[i]=this.tiles[n].width}}else{var s=Math.min(this.height,this.width),o=[256,512,1024],u=[];for(var a=0;a<o.length;a++)o[a]<=s&&u.push(o[a]);u.length>0?t.tileSize=Math.max.apply(null,u):t.tileSize=s,this.tile_width=t.tileSize,this.tile_height=t.tileSize}t.maxLevel||(this.scale_factors?t.maxLevel=Math.floor(Math.pow(Math.max.apply(null,this.scale_factors),.5)):t.maxLevel=Number(Math.ceil(Math.log(Math.max(this.width,this.height),2)))),e.TileSource.apply(this,[t])},e.extend(e.IIIFTileSource.prototype,e.TileSource.prototype,{supports:function(e,t){return e.protocol&&e.protocol=="http://iiif.io/api/image"?!0:!e["@context"]||e["@context"]!="http://library.stanford.edu/iiif/image-api/1.1/context.json"&&e["@context"]!="http://iiif.io/api/image/1/context.json"?e.profile&&e.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html")===0?!0:e.identifier&&e.width&&e.height?!0:e.documentElement&&"info"==e.documentElement.tagName&&"http://library.stanford.edu/iiif/image-api/ns/"==e.documentElement.namespaceURI?!0:!1:!0},configure:function(n,r){if(!e.isPlainObject(n)){var i=t(n);return i["@context"]="http://iiif.io/api/image/1.0/context.json",i["@id"]=r.replace("/info.xml",""),i}return n["@context"]?n:(n["@context"]="http://iiif.io/api/image/1.0/context.json",n["@id"]=r.replace("/info.json",""),n)},getTileSize:function(e){var t=Math.pow(2,this.maxLevel-e);return this.tileSizePerScaleFactor&&this.tileSizePerScaleFactor[t]&&(this.tileSize=this.tileSizePerScaleFactor[t]),this.tileSize},getTileUrl:function(e,t,n){var r="0",i=Math.pow(.5,this.maxLevel-e),s=Math.ceil(this.width*i),o=Math.ceil(this.height*i),u,a,f,l,c,h,p,d,v,m;return u=Math.ceil(this.getTileSize(e)/i),a=u,this["@context"].indexOf("/1.0/context.json")>-1||this["@context"].indexOf("/1.1/context.json")>-1||this["@context"].indexOf("/1/context.json")>-1?v="native.jpg":v="default.jpg",s<this.tile_width&&o<this.tile_height?(d=s+",",f="full"):(l=t*u,c=n*a,h=Math.min(u,this.width-l),p=Math.min(a,this.height-c),d=Math.ceil(h*i)+",",f=[l,c,h,p].join(",")),m=[this["@id"],f,d,r,v].join("/"),m}})})(OpenSeadragon)}.call(e),t})})(this);