/*
 * OpenSeadragon - Control
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

(function(e){var t;define([],function(){return function(){(function(e){e.ControlAnchor={NONE:0,TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4,ABSOLUTE:5},e.Control=function(t,n,r){var i=t.parentNode;typeof n=="number"&&(e.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; please use an options object instead.  Support for this deprecated variant is scheduled for removal in December 2013"),n={anchor:n}),n.attachToViewer=typeof n.attachToViewer=="undefined"?!0:n.attachToViewer,this.autoFade=typeof n.autoFade=="undefined"?!0:n.autoFade,this.element=t,this.anchor=n.anchor,this.container=r,this.anchor==e.ControlAnchor.ABSOLUTE?(this.wrapper=e.makeNeutralElement("div"),this.wrapper.style.position="absolute",this.wrapper.style.top=typeof n.top=="number"?n.top+"px":n.top,this.wrapper.style.left=typeof n.left=="number"?n.left+"px":n.left,this.wrapper.style.height=typeof n.height=="number"?n.height+"px":n.height,this.wrapper.style.width=typeof n.width=="number"?n.width+"px":n.width,this.wrapper.style.margin="0px",this.wrapper.style.padding="0px",this.element.style.position="relative",this.element.style.top="0px",this.element.style.left="0px",this.element.style.height="100%",this.element.style.width="100%"):(this.wrapper=e.makeNeutralElement("div"),this.wrapper.style.display="inline-block",this.anchor==e.ControlAnchor.NONE&&(this.wrapper.style.width=this.wrapper.style.height="100%")),this.wrapper.appendChild(this.element),n.attachToViewer?this.anchor==e.ControlAnchor.TOP_RIGHT||this.anchor==e.ControlAnchor.BOTTOM_RIGHT?this.container.insertBefore(this.wrapper,this.container.firstChild):this.container.appendChild(this.wrapper):i.appendChild(this.wrapper)},e.Control.prototype={destroy:function(){this.wrapper.removeChild(this.element),this.container.removeChild(this.wrapper)},isVisible:function(){return this.wrapper.style.display!="none"},setVisible:function(t){this.wrapper.style.display=t?this.anchor==e.ControlAnchor.ABSOLUTE?"block":"inline-block":"none"},setOpacity:function(t){this.element[e.SIGNAL]&&e.Browser.vendor==e.BROWSERS.IE?e.setElementOpacity(this.element,t,!0):e.setElementOpacity(this.wrapper,t,!0)}}})(OpenSeadragon)}.call(e),t})})(this);