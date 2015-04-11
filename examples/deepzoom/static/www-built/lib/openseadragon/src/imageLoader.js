/*
 * OpenSeadragon - ImageLoader
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 
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

(function(e){var t;define([],function(){return function(){(function(e){function t(t){e.extend(!0,this,{timeout:e.DEFAULT_SETTINGS.timeout,jobId:null},t),this.image=null}function n(e,t,n){var r;e.jobsInProgress--,(!e.jobLimit||e.jobsInProgress<e.jobLimit)&&e.jobQueue.length>0&&(r=e.jobQueue.shift(),r.start()),n(t.image)}t.prototype={start:function(){var e=this;this.image=new Image,this.crossOriginPolicy!==!1&&(this.image.crossOrigin=this.crossOriginPolicy),this.image.onload=function(){e.finish(!0)},this.image.onabort=this.image.onerror=function(){e.finish(!1)},this.jobId=window.setTimeout(function(){e.finish(!1)},this.timeout),this.image.src=this.src},finish:function(e){this.image.onload=this.image.onerror=this.image.onabort=null,e||(this.image=null),this.jobId&&window.clearTimeout(this.jobId),this.callback(this)}},e.ImageLoader=function(){e.extend(!0,this,{jobLimit:e.DEFAULT_SETTINGS.imageLoaderLimit,jobQueue:[],jobsInProgress:0})},e.ImageLoader.prototype={addJob:function(e){var r=this,i=function(t){n(r,t,e.callback)},s={src:e.src,crossOriginPolicy:e.crossOriginPolicy,callback:i},o=new t(s);!this.jobLimit||this.jobsInProgress<this.jobLimit?(o.start(),this.jobsInProgress++):this.jobQueue.push(o)},clear:function(){this.jobQueue=[]}}})(OpenSeadragon)}.call(e),t})})(this);