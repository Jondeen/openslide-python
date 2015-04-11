/*
 * OpenSeadragon - TileSourceCollection
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

(function(e){var t;define([],function(){return function(){(function(e){e.TileSourceCollection=function(t,n,r,i){var s;e.isPlainObject(t)?s=t:s={tileSize:arguments[0],tileSources:arguments[1],rows:arguments[2],layout:arguments[3]},s.layout||(s.layout="horizontal");var o=0,u=1,a=Math.ceil(s.tileSources.length/s.rows),f=a>=s.rows?a:s.rows;"horizontal"==s.layout?(s.width=s.tileSize*a,s.height=s.tileSize*s.rows):(s.height=s.tileSize*a,s.width=s.tileSize*s.rows),s.tileOverlap=-s.tileMargin,s.tilesPerRow=a;while(u<s.tileSize*f)u*=2,o++;s.minLevel=o,e.TileSource.apply(this,[s])},e.extend(e.TileSourceCollection.prototype,e.TileSource.prototype,{getTileBounds:function(t,n,r){var i=this.dimensions.times(this.getLevelScale(t)),s=this.tileSize*n-this.tileOverlap,o=this.tileSize*r-this.tileOverlap,u=this.tileSize+1*this.tileOverlap,a=this.tileSize+1*this.tileOverlap,f=1/i.x;return u=Math.min(u,i.x-s),a=Math.min(a,i.y-o),new e.Rect(s*f,o*f,u*f,a*f)},configure:function(e,t){return},getTileUrl:function(e,t,n){return null}})})(OpenSeadragon)}.call(e),t})})(this);