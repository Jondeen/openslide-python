/*
 * OpenSeadragon - Overlay
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

(function(e){var t;define([],function(){return function(){(function(e){e.OverlayPlacement={CENTER:0,TOP_LEFT:1,TOP:2,TOP_RIGHT:3,RIGHT:4,BOTTOM_RIGHT:5,BOTTOM:6,BOTTOM_LEFT:7,LEFT:8},e.Overlay=function(t,n,r){var i;e.isPlainObject(t)?i=t:i={element:t,location:n,placement:r},this.element=i.element,this.scales=i.location instanceof e.Rect,this.bounds=new e.Rect(i.location.x,i.location.y,i.location.width,i.location.height),this.position=new e.Point(i.location.x,i.location.y),this.size=new e.Point(i.location.width,i.location.height),this.style=i.element.style,this.placement=i.location instanceof e.Point?i.placement:e.OverlayPlacement.TOP_LEFT,this.onDraw=i.onDraw,this.checkResize=i.checkResize===undefined?!0:i.checkResize},e.Overlay.prototype={adjust:function(t,n){switch(this.placement){case e.OverlayPlacement.TOP_LEFT:break;case e.OverlayPlacement.TOP:t.x-=n.x/2;break;case e.OverlayPlacement.TOP_RIGHT:t.x-=n.x;break;case e.OverlayPlacement.RIGHT:t.x-=n.x,t.y-=n.y/2;break;case e.OverlayPlacement.BOTTOM_RIGHT:t.x-=n.x,t.y-=n.y;break;case e.OverlayPlacement.BOTTOM:t.x-=n.x/2,t.y-=n.y;break;case e.OverlayPlacement.BOTTOM_LEFT:t.y-=n.y;break;case e.OverlayPlacement.LEFT:t.y-=n.y/2;break;default:case e.OverlayPlacement.CENTER:t.x-=n.x/2,t.y-=n.y/2}},destroy:function(){var e=this.element,t=this.style;e.parentNode&&(e.parentNode.removeChild(e),e.prevElementParent&&(t.display="none",document.body.appendChild(e))),this.onDraw=null,t.top="",t.left="",t.position="",this.scales&&(t.width="",t.height="")},drawHTML:function(t,n){var r=this.element,i=this.style,s=this.scales,o=n.degrees,u=n.pixelFromPoint(this.bounds.getTopLeft(),!0),a,f;r.parentNode!=t&&(r.prevElementParent=r.parentNode,r.prevNextSibling=r.nextSibling,t.appendChild(r),this.size=e.getElementSize(r)),s?a=n.deltaPixelsFromPoints(this.bounds.getSize(),!0):this.checkResize?a=e.getElementSize(r):a=this.size,this.position=u,this.size=a,this.adjust(u,a),u=u.apply(Math.floor),a=a.apply(Math.ceil);if(o!==0&&this.scales){f=new e.Point(a.x/2,a.y/2);var l=new e.Point(n.viewer.drawer.canvas.width/2,n.viewer.drawer.canvas.height/2);u=u.plus(f).rotate(o,l).minus(f),a=a.rotate(o,new e.Point(0,0)),a=new e.Point(Math.abs(a.x),Math.abs(a.y))}this.onDraw?this.onDraw(u,a,r):(i.left=u.x+"px",i.top=u.y+"px",i.position="absolute",i.display="block",s&&(i.width=a.x+"px",i.height=a.y+"px"))},update:function(t,n){this.scales=t instanceof e.Rect,this.bounds=new e.Rect(t.x,t.y,t.width,t.height),this.placement=t instanceof e.Point?n:e.OverlayPlacement.TOP_LEFT}}})(OpenSeadragon)}.call(e),t})})(this);