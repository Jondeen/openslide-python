/*
 * OpenSeadragon - EventSource
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

(function(e){var t;define([],function(){return function(){(function(e){e.EventSource=function(){this.events={}},e.EventSource.prototype={addHandler:function(t,n,r){var i=this.events[t];i||(this.events[t]=i=[]),n&&e.isFunction(n)&&(i[i.length]={handler:n,userData:r||null})},removeHandler:function(t,n){var r=this.events[t],i=[],s;if(!r)return;if(e.isArray(r)){for(s=0;s<r.length;s++)r[s].handler!==n&&i.push(r[s]);this.events[t]=i}},removeAllHandlers:function(e){if(e)this.events[e]=[];else for(var t in this.events)this.events[t]=[]},getHandler:function(e){var t=this.events[e];return!t||!t.length?null:(t=t.length===1?[t[0]]:Array.apply(null,t),function(e,n){var r,i=t.length;for(r=0;r<i;r++)t[r]&&(n.eventSource=e,n.userData=t[r].userData,t[r].handler(n))})},raiseEvent:function(e,t){var n=this.getHandler(e);n&&(t||(t={}),n(this,t))}}})(OpenSeadragon)}.call(e),t})})(this);