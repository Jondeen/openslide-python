/*
 * OpenSeadragon - full-screen support functions
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

(function(e){var t;define([],function(){return function(){(function(e){var t={supportsFullScreen:!1,isFullScreen:function(){return!1},getFullScreenElement:function(){return null},requestFullScreen:function(){},exitFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",fullScreenErrorEventName:""};document.exitFullscreen?(t.supportsFullScreen=!0,t.getFullScreenElement=function(){return document.fullscreenElement},t.requestFullScreen=function(e){return e.requestFullscreen()},t.exitFullScreen=function(){document.exitFullscreen()},t.fullScreenEventName="fullscreenchange",t.fullScreenErrorEventName="fullscreenerror"):document.msExitFullscreen?(t.supportsFullScreen=!0,t.getFullScreenElement=function(){return document.msFullscreenElement},t.requestFullScreen=function(e){return e.msRequestFullscreen()},t.exitFullScreen=function(){document.msExitFullscreen()},t.fullScreenEventName="MSFullscreenChange",t.fullScreenErrorEventName="MSFullscreenError"):document.webkitExitFullscreen?(t.supportsFullScreen=!0,t.getFullScreenElement=function(){return document.webkitFullscreenElement},t.requestFullScreen=function(e){return e.webkitRequestFullscreen()},t.exitFullScreen=function(){document.webkitExitFullscreen()},t.fullScreenEventName="webkitfullscreenchange",t.fullScreenErrorEventName="webkitfullscreenerror"):document.webkitCancelFullScreen?(t.supportsFullScreen=!0,t.getFullScreenElement=function(){return document.webkitCurrentFullScreenElement},t.requestFullScreen=function(e){return e.webkitRequestFullScreen()},t.exitFullScreen=function(){document.webkitCancelFullScreen()},t.fullScreenEventName="webkitfullscreenchange",t.fullScreenErrorEventName="webkitfullscreenerror"):document.mozCancelFullScreen&&(t.supportsFullScreen=!0,t.getFullScreenElement=function(){return document.mozFullScreenElement},t.requestFullScreen=function(e){return e.mozRequestFullScreen()},t.exitFullScreen=function(){document.mozCancelFullScreen()},t.fullScreenEventName="mozfullscreenchange",t.fullScreenErrorEventName="mozfullscreenerror"),t.isFullScreen=function(){return t.getFullScreenElement()!==null},t.cancelFullScreen=function(){e.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead."),t.exitFullScreen()},e.extend(e,t)})(OpenSeadragon)}.call(e),t})})(this);