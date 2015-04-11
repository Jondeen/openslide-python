// ---------------------------------------------------------------------------------------
// Note: The following BSD-New license relates only to this particular file, which is
// not part of the runtime package for KnockoutJS - it is only used as part of a mechanism
// for testing KnockoutJS.
// The following license is *not* the license for KnockoutJS.
// ---------------------------------------------------------------------------------------

//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//  * Neither the name of the <organization> nor the
//    names of its contributors may be used to endorse or promote products
//    derived from this software without specific prior written permission.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
//DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
//ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
//THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

define(["require","exports","module","system","webpage"],function(require,exports,module){function waitFor(testFx,onReady,timeOutMillis){var maxtimeOutMillis=timeOutMillis?timeOutMillis:3001,start=(new Date).getTime(),condition=!1,interval=setInterval(function(){(new Date).getTime()-start<maxtimeOutMillis&&!condition?condition=typeof testFx=="string"?eval(testFx):testFx():condition?(typeof onReady=="string"?eval(onReady):onReady(),clearInterval(interval)):(console.log("'waitFor()' timeout"),phantom.exit(1))},100)}var system=require("system"),page=require("webpage").create();console.log("Running Knockout tests in Phantom.js"),page.onConsoleMessage=function(e){console.log(e)},page.open(system.args[1]||"spec/runner.html?src=build/output/knockout-latest.js",function(e){e!=="success"?(console.log("Unable to access network"),phantom.exit()):waitFor(function(){return page.evaluate(function(){return document.body.querySelector(".symbolSummary .pending")===null})},function(){var e=page.evaluate(function(){var e=document.body.querySelectorAll(".results > #details > .specDetail.failed");if(e&&e.length>0){console.log(""),console.log(e.length+" test(s) FAILED:");for(i=0;i<e.length;++i){var t=e[i],n=t.querySelector(".description"),r=t.querySelector(".resultMessage.fail");console.log(""),console.log(n.innerText),console.log(r.innerText),console.log("")}return 1}return console.log(document.body.querySelector(".alert > .passingAlert.bar").innerText),0});phantom.exit(e)})})});