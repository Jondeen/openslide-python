/*
 * OpenSeadragon - TmsTileSource
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

/*
 * Derived from the TMS tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */

(function(e){var t;define([],function(){return function(){(function(e){e.TmsTileSource=function(t,n,r,i,s){var o;e.isPlainObject(t)?o=t:o={width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]};var u=Math.ceil(o.width/256)*256,a=Math.ceil(o.height/256)*256,f;u>a?f=u/256:f=a/256,o.maxLevel=Math.ceil(Math.log(f)/Math.log(2))-1,o.tileSize=256,o.width=u,o.height=a,e.TileSource.apply(this,[o])},e.extend(e.TmsTileSource.prototype,e.TileSource.prototype,{supports:function(e,t){return e.type&&"tiledmapservice"==e.type},configure:function(e,t){return e},getTileUrl:function(e,t,n){var r=this.getNumTiles(e).y-1;return this.tilesUrl+e+"/"+t+"/"+(r-n)+".png"}})})(OpenSeadragon)}.call(e),t})})(this);