/*
 * OpenSeadragon - Point
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

(function(e){var t;define([],function(){return function(){(function(e){e.Point=function(e,t){this.x=typeof e=="number"?e:0,this.y=typeof t=="number"?t:0},e.Point.prototype={plus:function(t){return new e.Point(this.x+t.x,this.y+t.y)},minus:function(t){return new e.Point(this.x-t.x,this.y-t.y)},times:function(t){return new e.Point(this.x*t,this.y*t)},divide:function(t){return new e.Point(this.x/t,this.y/t)},negate:function(){return new e.Point(-this.x,-this.y)},distanceTo:function(e){return Math.sqrt(Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2))},apply:function(t){return new e.Point(t(this.x),t(this.y))},equals:function(t){return t instanceof e.Point&&this.x===t.x&&this.y===t.y},rotate:function(t,n){var r=t*Math.PI/180,i=Math.cos(r)*(this.x-n.x)-Math.sin(r)*(this.y-n.y)+n.x,s=Math.sin(r)*(this.x-n.x)+Math.cos(r)*(this.y-n.y)+n.y;return new e.Point(i,s)},toString:function(){return"("+Math.round(this.x)+","+Math.round(this.y)+")"}}})(OpenSeadragon)}.call(e),t})})(this);