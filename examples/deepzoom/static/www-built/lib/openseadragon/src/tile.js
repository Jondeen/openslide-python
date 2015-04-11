/*
 * OpenSeadragon - Tile
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

(function(e){var t;define([],function(){return function(){(function(e){var t={};e.Tile=function(e,t,n,r,i,s){this.level=e,this.x=t,this.y=n,this.bounds=r,this.exists=i,this.url=s,this.loaded=!1,this.loading=!1,this.element=null,this.imgElement=null,this.image=null,this.style=null,this.position=null,this.size=null,this.blendStart=null,this.opacity=null,this.distance=null,this.visibility=null,this.beingDrawn=!1,this.lastTouchTime=0},e.Tile.prototype={toString:function(){return this.level+"/"+this.x+"_"+this.y},drawHTML:function(t){if(!this.loaded||!this.image){e.console.warn("Attempting to draw tile %s when it's not yet loaded.",this.toString());return}this.element||(this.element=e.makeNeutralElement("div"),this.imgElement=e.makeNeutralElement("img"),this.imgElement.src=this.url,this.imgElement.style.msInterpolationMode="nearest-neighbor",this.imgElement.style.width="100%",this.imgElement.style.height="100%",this.style=this.element.style,this.style.position="absolute"),this.element.parentNode!=t&&t.appendChild(this.element),this.imgElement.parentNode!=this.element&&this.element.appendChild(this.imgElement),this.style.top=this.position.y+"px",this.style.left=this.position.x+"px",this.style.height=this.size.y+"px",this.style.width=this.size.x+"px",e.setElementOpacity(this.element,this.opacity)},drawCanvas:function(n,r){var i=this.position,s=this.size,o,u;if(!this.loaded||!this.image&&!t[this.url]){e.console.warn("Attempting to draw tile %s when it's not yet loaded.",this.toString());return}n.globalAlpha=this.opacity,n.globalAlpha==1&&this.url.match(".png")&&n.clearRect(i.x+1,i.y+1,s.x-2,s.y-2),t[this.url]||(u=document.createElement("canvas"),u.width=this.image.width,u.height=this.image.height,o=u.getContext("2d"),o.drawImage(this.image,0,0),t[this.url]=o,this.image=null),o=t[this.url],r({context:n,tile:this,rendered:o}),n.drawImage(o.canvas,0,0,o.canvas.width,o.canvas.height,i.x,i.y,s.x,s.y)},unload:function(){this.imgElement&&this.imgElement.parentNode&&this.imgElement.parentNode.removeChild(this.imgElement),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),t[this.url]&&delete t[this.url],this.element=null,this.imgElement=null,this.image=null,this.loaded=!1,this.loading=!1}}})(OpenSeadragon)}.call(e),t})})(this);