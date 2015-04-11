/*
 * OpenSeadragon - Button
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

(function(e){var t;define([],function(){return function(){(function(e){function t(t){e.requestAnimationFrame(function(){n(t)})}function n(n){var r,i,s;n.shouldFade&&(r=e.now(),i=r-n.fadeBeginTime,s=1-i/n.fadeLength,s=Math.min(1,s),s=Math.max(0,s),n.imgGroup&&e.setElementOpacity(n.imgGroup,s,!0),s>0&&t(n))}function r(n){n.shouldFade=!0,n.fadeBeginTime=e.now()+n.fadeDelay,window.setTimeout(function(){t(n)},n.fadeDelay)}function i(t){t.shouldFade=!1,t.imgGroup&&e.setElementOpacity(t.imgGroup,1,!0)}function s(t,n){if(t.element.disabled)return;n>=e.ButtonState.GROUP&&t.currentState==e.ButtonState.REST&&(i(t),t.currentState=e.ButtonState.GROUP),n>=e.ButtonState.HOVER&&t.currentState==e.ButtonState.GROUP&&(t.imgHover&&(t.imgHover.style.visibility=""),t.currentState=e.ButtonState.HOVER),n>=e.ButtonState.DOWN&&t.currentState==e.ButtonState.HOVER&&(t.imgDown&&(t.imgDown.style.visibility=""),t.currentState=e.ButtonState.DOWN)}function o(t,n){if(t.element.disabled)return;n<=e.ButtonState.HOVER&&t.currentState==e.ButtonState.DOWN&&(t.imgDown&&(t.imgDown.style.visibility="hidden"),t.currentState=e.ButtonState.HOVER),n<=e.ButtonState.GROUP&&t.currentState==e.ButtonState.HOVER&&(t.imgHover&&(t.imgHover.style.visibility="hidden"),t.currentState=e.ButtonState.GROUP),n<=e.ButtonState.REST&&t.currentState==e.ButtonState.GROUP&&(r(t),t.currentState=e.ButtonState.REST)}e.ButtonState={REST:0,GROUP:1,HOVER:2,DOWN:3},e.Button=function(t){var n=this;e.EventSource.call(this),e.extend(!0,this,{tooltip:null,srcRest:null,srcGroup:null,srcHover:null,srcDown:null,clickTimeThreshold:e.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:e.DEFAULT_SETTINGS.clickDistThreshold,fadeDelay:0,fadeLength:2e3,onPress:null,onRelease:null,onClick:null,onEnter:null,onExit:null,onFocus:null,onBlur:null},t),this.element=t.element||e.makeNeutralElement("div"),t.element||(this.imgRest=e.makeTransparentImage(this.srcRest),this.imgGroup=e.makeTransparentImage(this.srcGroup),this.imgHover=e.makeTransparentImage(this.srcHover),this.imgDown=e.makeTransparentImage(this.srcDown),this.imgRest.alt=this.imgGroup.alt=this.imgHover.alt=this.imgDown.alt=this.tooltip,this.element.style.position="relative",e.setElementTouchActionNone(this.element),this.imgGroup.style.position=this.imgHover.style.position=this.imgDown.style.position="absolute",this.imgGroup.style.top=this.imgHover.style.top=this.imgDown.style.top="0px",this.imgGroup.style.left=this.imgHover.style.left=this.imgDown.style.left="0px",this.imgHover.style.visibility=this.imgDown.style.visibility="hidden",e.Browser.vendor==e.BROWSERS.FIREFOX&&e.Browser.version<3&&(this.imgGroup.style.top=this.imgHover.style.top=this.imgDown.style.top=""),this.element.appendChild(this.imgRest),this.element.appendChild(this.imgGroup),this.element.appendChild(this.imgHover),this.element.appendChild(this.imgDown)),this.addHandler("press",this.onPress),this.addHandler("release",this.onRelease),this.addHandler("click",this.onClick),this.addHandler("enter",this.onEnter),this.addHandler("exit",this.onExit),this.addHandler("focus",this.onFocus),this.addHandler("blur",this.onBlur),this.currentState=e.ButtonState.GROUP,this.fadeBeginTime=null,this.shouldFade=!1,this.element.style.display="inline-block",this.element.style.position="relative",this.element.title=this.tooltip,this.tracker=new e.MouseTracker({element:this.element,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,enterHandler:function(t){t.insideElementPressed?(s(n,e.ButtonState.DOWN),n.raiseEvent("enter",{originalEvent:t.originalEvent})):t.buttonDownAny||s(n,e.ButtonState.HOVER)},focusHandler:function(e){this.enterHandler(e),n.raiseEvent("focus",{originalEvent:e.originalEvent})},exitHandler:function(t){o(n,e.ButtonState.GROUP),t.insideElementPressed&&n.raiseEvent("exit",{originalEvent:t.originalEvent})},blurHandler:function(e){this.exitHandler(e),n.raiseEvent("blur",{originalEvent:e.originalEvent})},pressHandler:function(t){s(n,e.ButtonState.DOWN),n.raiseEvent("press",{originalEvent:t.originalEvent})},releaseHandler:function(t){t.insideElementPressed&&t.insideElementReleased?(o(n,e.ButtonState.HOVER),n.raiseEvent("release",{originalEvent:t.originalEvent})):t.insideElementPressed?o(n,e.ButtonState.GROUP):s(n,e.ButtonState.HOVER)},clickHandler:function(e){e.quick&&n.raiseEvent("click",{originalEvent:e.originalEvent})},keyHandler:function(e){return 13===e.keyCode?(n.raiseEvent("click",{originalEvent:e.originalEvent}),n.raiseEvent("release",{originalEvent:e.originalEvent}),!1):!0}}),o(this,e.ButtonState.REST)},e.extend(e.Button.prototype,e.EventSource.prototype,{notifyGroupEnter:function(){s(this,e.ButtonState.GROUP)},notifyGroupExit:function(){o(this,e.ButtonState.REST)},disable:function(){this.notifyGroupExit(),this.element.disabled=!0,e.setElementOpacity(this.element,.2,!0)},enable:function(){this.element.disabled=!1,e.setElementOpacity(this.element,1,!0),this.notifyGroupEnter()}})})(OpenSeadragon)}.call(e),t})})(this);