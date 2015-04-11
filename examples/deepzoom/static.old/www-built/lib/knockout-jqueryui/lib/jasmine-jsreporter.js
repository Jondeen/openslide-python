/*
  This file is part of the Jasmine JSReporter project from Ivan De Marino.

  Copyright (C) 2011-2014 Ivan De Marino <http://ivandemarino.me>
  Copyright (C) 2014 Alex Treppass <http://alextreppass.co.uk>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL IVAN DE MARINO BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function(e){var t;define(["jquery"],function(n){return function(){(function(e){function t(e,t){return(t-e)/1e3}function n(e,t){return t=t||2,Math.round(e*Math.pow(10,t))/Math.pow(10,t)}function r(e){var t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],r.passed_||t.push(r);return t}function i(e){var t={description:e.description,durationSec:0,specs:[],suites:[],passed:!0},s=e.specs(),o=e.suites(),u,a;for(u=0,a=s.length;u<a;++u)t.specs[u]={description:s[u].description,durationSec:s[u].durationSec,passed:s[u].results().passedCount===s[u].results().totalCount,skipped:s[u].results().skipped,passedCount:s[u].results().passedCount,failedCount:s[u].results().failedCount,totalCount:s[u].results().totalCount,failures:r(s[u].results().getItems())},t.passed=t.specs[u].passed?t.passed:!1,t.durationSec+=t.specs[u].durationSec;for(u=0,a=o.length;u<a;++u)t.suites[u]=i(o[u]),t.passed=t.suites[u].passed?t.passed:!1,t.durationSec+=t.suites[u].durationSec;return t.durationSec=n(t.durationSec,4),t}function s(e){var t;for(t=e.specs.length-1;t>=0;--t)e.specs[t].passed&&e.specs.splice(t,1),o(e)}function o(e){var t;for(t=e.suites.length-1;t>=0;--t)e.suites[t].passed?e.suites.splice(t,1):s(e.suites[t])}if(!e)throw new Error("[Jasmine JSReporter] 'Jasmine' library not found");var u=function(){};u.prototype={reportRunnerStarting:function(e){},reportSpecStarting:function(e){e.startedAt=new Date},reportSpecResults:function(e){e.finishedAt=new Date,e.durationSec=e.startedAt?t(e.startedAt.getTime(),e.finishedAt.getTime()):0},reportSuiteResults:function(e){},reportRunnerResults:function(t){var n=t.suites(),r,s,u;e.runnerResults={suites:[],durationSec:0,passed:!0};for(r=0,u=n.length,s=0;r<u;++r)n[r].parentSuite===null&&(e.runnerResults.suites[s]=i(n[r]),e.runnerResults.passed=e.runnerResults.suites[s].passed?e.runnerResults.passed:!1,e.runnerResults.durationSec+=e.runnerResults.suites[s].durationSec,s++);o(e.runnerResults)}},e.JSReporter=u,e.getJSReport=function(){return e.runnerResults?e.runnerResults:null},e.getJSReportAsString=function(){return JSON.stringify(e.getJSReport())}})(jasmine)}.call(e),t})})(this);