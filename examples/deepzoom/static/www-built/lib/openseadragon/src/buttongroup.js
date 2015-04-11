/*
 * OpenSeadragon - ButtonGroup
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

(function(e){var t;define([],function(){return function(){(function(e){e.ButtonGroup=function(t){e.extend(!0,this,{buttons:[],clickTimeThreshold:e.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:e.DEFAULT_SETTINGS.clickDistThreshold,labelText:""},t);var n=this.buttons.concat([]),r=this,i;this.element=t.element||e.makeNeutralElement("div");if(!t.group){this.label=e.makeNeutralElement("label"),this.element.style.display="inline-block",this.element.appendChild(this.label);for(i=0;i<n.length;i++)this.element.appendChild(n[i].element)}e.setElementTouchActionNone(this.element),this.tracker=new e.MouseTracker({element:this.element,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,enterHandler:function(e){var t;for(t=0;t<r.buttons.length;t++)r.buttons[t].notifyGroupEnter()},exitHandler:function(e){var t;if(!e.insideElementPressed)for(t=0;t<r.buttons.length;t++)r.buttons[t].notifyGroupExit()}})},e.ButtonGroup.prototype={emulateEnter:function(){this.tracker.enterHandler({eventSource:this.tracker})},emulateExit:function(){this.tracker.exitHandler({eventSource:this.tracker})}}})(OpenSeadragon)}.call(e),t})})(this);