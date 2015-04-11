(function(e){var t;define([],function(){return function(){describe("DOM node disposal",function(){beforeEach(jasmine.prepareTestNode),it("Should run registered disposal callbacks when a node is cleaned",function(){var e=!1;ko.utils.domNodeDisposal.addDisposeCallback(testNode,function(){e=!0}),expect(e).toEqual(!1),ko.cleanNode(testNode),expect(e).toEqual(!0)}),it("Should run registered disposal callbacks on descendants when a node is cleaned",function(){var e=!1,t=document.createElement("DIV"),n=document.createElement("DIV");testNode.appendChild(t),t.appendChild(n),ko.utils.domNodeDisposal.addDisposeCallback(n,function(){e=!0}),expect(e).toEqual(!1),ko.cleanNode(testNode),expect(e).toEqual(!0)}),it("Should run registered disposal callbacks and detach from DOM when a node is removed",function(){var e=!1,t=document.createElement("DIV");testNode.appendChild(t),ko.utils.domNodeDisposal.addDisposeCallback(t,function(){e=!0}),expect(e).toEqual(!1),expect(testNode.childNodes.length).toEqual(1),ko.removeNode(t),expect(e).toEqual(!0),expect(testNode.childNodes.length).toEqual(0)}),it("Should be able to remove previously-registered disposal callbacks",function(){var e=!1,t=function(){e=!0};ko.utils.domNodeDisposal.addDisposeCallback(testNode,t),expect(e).toEqual(!1),ko.utils.domNodeDisposal.removeDisposeCallback(testNode,t),ko.cleanNode(testNode),expect(e).toEqual(!1)}),it("Should be able to attach disposal callback to a node that has been cloned",function(){var e=document.createElement("DIV");ko.utils.domNodeDisposal.addDisposeCallback(e,function(){});var t=e.cloneNode(!0);ko.cleanNode(e),ko.utils.domNodeDisposal.addDisposeCallback(t,function(){})}),it('Should be able to clean any user data by overwriting "cleanExternalData"',function(){this.restoreAfter(ko.utils.domNodeDisposal,"cleanExternalData"),ko.utils.domNodeDisposal.cleanExternalData=function(e){e.ko_test&&(e.ko_test=undefined)},testNode.ko_test="mydata",expect(testNode.ko_test).toEqual("mydata"),ko.cleanNode(testNode),expect(testNode.ko_test).toBeUndefined()}),it("If jQuery is referenced, should clear jQuery data when a node is cleaned",function(){if(typeof jQuery=="undefined")return;var e={};jQuery.data(testNode,"ko_test",e),expect(jQuery.data(testNode,"ko_test")).toBe(e),ko.cleanNode(testNode),expect(jQuery.data(testNode,"ko_test")).toBeUndefined()}),it('If jQuery is referenced, should be able to prevent jQuery data from being cleared by overwriting "cleanExternalData"',function(){if(typeof jQuery=="undefined")return;this.restoreAfter(ko.utils.domNodeDisposal,"cleanExternalData"),ko.utils.domNodeDisposal.cleanExternalData=function(){};var e={};jQuery.data(testNode,"ko_test",e),expect(jQuery.data(testNode,"ko_test")).toBe(e),ko.cleanNode(testNode),expect(jQuery.data(testNode,"ko_test")).toBe(e)})})}.call(e),t})})(this);