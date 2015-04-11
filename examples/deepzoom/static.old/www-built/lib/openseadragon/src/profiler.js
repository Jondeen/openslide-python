/*
 * OpenSeadragon - Profiler
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

(function(e){var t;define([],function(){return function(){(function(e){e.Profiler=function(){this.midUpdate=!1,this.numUpdates=0,this.lastBeginTime=null,this.lastEndTime=null,this.minUpdateTime=Infinity,this.avgUpdateTime=0,this.maxUpdateTime=0,this.minIdleTime=Infinity,this.avgIdleTime=0,this.maxIdleTime=0},e.Profiler.prototype={beginUpdate:function(){this.midUpdate&&this.endUpdate(),this.midUpdate=!0,this.lastBeginTime=e.now();if(this.numUpdates<1)return;var t=this.lastBeginTime-this.lastEndTime;this.avgIdleTime=(this.avgIdleTime*(this.numUpdates-1)+t)/this.numUpdates,t<this.minIdleTime&&(this.minIdleTime=t),t>this.maxIdleTime&&(this.maxIdleTime=t)},endUpdate:function(){if(!this.midUpdate)return;this.lastEndTime=e.now(),this.midUpdate=!1;var t=this.lastEndTime-this.lastBeginTime;this.numUpdates++,this.avgUpdateTime=(this.avgUpdateTime*(this.numUpdates-1)+t)/this.numUpdates,t<this.minUpdateTime&&(this.minUpdateTime=t),t>this.maxUpdateTime&&(this.maxUpdateTime=t)},clearProfile:function(){this.midUpdate=!1,this.numUpdates=0,this.lastBeginTime=null,this.lastEndTime=null,this.minUpdateTime=Infinity,this.avgUpdateTime=0,this.maxUpdateTime=0,this.minIdleTime=Infinity,this.avgIdleTime=0,this.maxIdleTime=0}}})(OpenSeadragon)}.call(e),t})})(this);