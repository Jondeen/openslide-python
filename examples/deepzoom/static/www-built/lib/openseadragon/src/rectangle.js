/*
 * OpenSeadragon - Rect
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

(function(e){var t;define([],function(){return function(){(function(e){e.Rect=function(e,t,n,r){this.x=typeof e=="number"?e:0,this.y=typeof t=="number"?t:0,this.width=typeof n=="number"?n:0,this.height=typeof r=="number"?r:0},e.Rect.prototype={getAspectRatio:function(){return this.width/this.height},getTopLeft:function(){return new e.Point(this.x,this.y)},getBottomRight:function(){return new e.Point(this.x+this.width,this.y+this.height)},getTopRight:function(){return new e.Point(this.x+this.width,this.y)},getBottomLeft:function(){return new e.Point(this.x,this.y+this.height)},getCenter:function(){return new e.Point(this.x+this.width/2,this.y+this.height/2)},getSize:function(){return new e.Point(this.width,this.height)},equals:function(t){return t instanceof e.Rect&&this.x===t.x&&this.y===t.y&&this.width===t.width&&this.height===t.height},times:function(e){return new OpenSeadragon.Rect(this.x*e,this.y*e,this.width*e,this.height*e)},rotate:function(t,n){var r=this.width,i=this.height,s;t=(t+360)%360;if(t%90!==0)throw new Error("Currently only 0, 90, 180, and 270 degrees are supported.");if(t===0)return new e.Rect(this.x,this.y,this.width,this.height);n=n||this.getCenter();switch(t){case 90:s=this.getBottomLeft(),r=this.height,i=this.width;break;case 180:s=this.getBottomRight();break;case 270:s=this.getTopRight(),r=this.height,i=this.width;break;default:s=this.getTopLeft()}return s=s.rotate(t,n),new e.Rect(s.x,s.y,r,i)},toString:function(){return"["+Math.round(this.x*100)+","+Math.round(this.y*100)+","+Math.round(this.width*100)+"x"+Math.round(this.height*100)+"]"}}})(OpenSeadragon)}.call(e),t})})(this);