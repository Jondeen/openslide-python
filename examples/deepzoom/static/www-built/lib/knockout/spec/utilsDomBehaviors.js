(function(e){var t;define([],function(){return function(){describe("setTextContent",function(){var e;beforeEach(function(){e=document.createElement("DIV")}),it("defaults to empty string",function(){ko.utils.setTextContent(e),expect(e.innerHTML).toEqual("")}),it("sets text from plain values or observables",function(){ko.utils.setTextContent(e,"test"),expect(e.innerHTML).toEqual("test"),ko.utils.setTextContent(e,ko.observable("change")),expect(e.innerHTML).toEqual("change")}),it("overwrites existing text",function(){e.innerHTML="existing",ko.utils.setTextContent(e,"changed"),expect(e.innerHTML).toEqual("changed")})})}.call(e),t})})(this);