/*
 * OpenSeadragon - ControlDock
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

(function(e){var t;define([],function(){return function(){(function(e){function t(e,t){var n=e.controls,r;for(r=n.length-1;r>=0;r--)if(n[r].element==t)return r;return-1}e.ControlDock=function(t){var n=["topleft","topright","bottomright","bottomleft"],r,i;e.extend(!0,this,{id:"controldock-"+e.now()+"-"+Math.floor(Math.random()*1e6),container:e.makeNeutralElement("div"),controls:[]},t),this.container.onsubmit=function(){return!1},this.element&&(this.element=e.getElement(this.element),this.element.appendChild(this.container),this.element.style.position="relative",this.container.style.width="100%",this.container.style.height="100%");for(i=0;i<n.length;i++)r=n[i],this.controls[r]=e.makeNeutralElement("div"),this.controls[r].style.position="absolute",r.match("left")&&(this.controls[r].style.left="0px"),r.match("right")&&(this.controls[r].style.right="0px"),r.match("top")&&(this.controls[r].style.top="0px"),r.match("bottom")&&(this.controls[r].style.bottom="0px");this.container.appendChild(this.controls.topleft),this.container.appendChild(this.controls.topright),this.container.appendChild(this.controls.bottomright),this.container.appendChild(this.controls.bottomleft)},e.ControlDock.prototype={addControl:function(n,r){n=e.getElement(n);var i=null;if(t(this,n)>=0)return;switch(r.anchor){case e.ControlAnchor.TOP_RIGHT:i=this.controls.topright,n.style.position="relative",n.style.paddingRight="0px",n.style.paddingTop="0px";break;case e.ControlAnchor.BOTTOM_RIGHT:i=this.controls.bottomright,n.style.position="relative",n.style.paddingRight="0px",n.style.paddingBottom="0px";break;case e.ControlAnchor.BOTTOM_LEFT:i=this.controls.bottomleft,n.style.position="relative",n.style.paddingLeft="0px",n.style.paddingBottom="0px";break;case e.ControlAnchor.TOP_LEFT:i=this.controls.topleft,n.style.position="relative",n.style.paddingLeft="0px",n.style.paddingTop="0px";break;case e.ControlAnchor.ABSOLUTE:i=this.container,n.style.margin="0px",n.style.padding="0px";break;default:case e.ControlAnchor.NONE:i=this.container,n.style.margin="0px",n.style.padding="0px"}this.controls.push(new e.Control(n,r,i)),n.style.display="inline-block"},removeControl:function(n){n=e.getElement(n);var r=t(this,n);return r>=0&&(this.controls[r].destroy(),this.controls.splice(r,1)),this},clearControls:function(){while(this.controls.length>0)this.controls.pop().destroy();return this},areControlsEnabled:function(){var e;for(e=this.controls.length-1;e>=0;e--)if(this.controls[e].isVisible())return!0;return!1},setControlsEnabled:function(e){var t;for(t=this.controls.length-1;t>=0;t--)this.controls[t].setVisible(e);return this}}})(OpenSeadragon)}.call(e),t})})(this);