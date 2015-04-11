/*
 * OpenSeadragon - Spring
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

(function(e){var t;define([],function(){return function(){(function(e){function t(e,t){return(1-Math.exp(e*-t))/(1-Math.exp(-e))}e.Spring=function(t){var n=arguments;typeof t!="object"&&(t={initial:n.length&&typeof n[0]=="number"?n[0]:0,springStiffness:n.length>1?n[1].springStiffness:5,animationTime:n.length>1?n[1].animationTime:1.5}),e.extend(!0,this,t),this.current={value:typeof this.initial=="number"?this.initial:0,time:e.now()},this.start={value:this.current.value,time:this.current.time},this.target={value:this.current.value,time:this.current.time}},e.Spring.prototype={resetTo:function(e){this.target.value=e,this.target.time=this.current.time,this.start.value=this.target.value,this.start.time=this.target.time},springTo:function(e){this.start.value=this.current.value,this.start.time=this.current.time,this.target.value=e,this.target.time=this.start.time+1e3*this.animationTime},shiftBy:function(e){this.start.value+=e,this.target.value+=e},update:function(){this.current.time=e.now(),this.current.value=this.current.time>=this.target.time?this.target.value:this.start.value+(this.target.value-this.start.value)*t(this.springStiffness,(this.current.time-this.start.time)/(this.target.time-this.start.time))}}})(OpenSeadragon)}.call(e),t})})(this);