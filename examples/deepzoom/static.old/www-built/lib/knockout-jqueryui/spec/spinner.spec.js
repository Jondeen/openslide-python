(function(e){var t;define(["jquery"],function(n){return function(){(function(){"use strict";if(getMajorMinorVersion($.ui.version)==="1.8")return;describe("The spinner binding",function(){it("should handle each option of the widget",function(){testWidgetOptions("spinner",{culture:[null,"fr"],disabled:[!1,!0],icons:[{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},{down:"custom-down-icon",up:"custom-up-icon"}],incremental:[!0,!1],max:[null,50],min:[null,10],numberFormat:[null,"n"],page:[10,5],step:[1,2]})}),it("should handle each event of the widget",function(){var e,t;e=$('<div data-bind="spinner: { create: createEventHandler }"></div>').prependTo("body"),t={createEventHandler:jasmine.createSpy()},ko.applyBindings(t,e[0]),expect(t.createEventHandler).toHaveBeenCalled(),ko.removeNode(e[0])}),it("should write the widget's value to the viewmodel's bound property when it changes.",function(){var e,t=!1,n;e=$('<input data-bind="spinner: { value: value }" />').prependTo("body"),n={value:ko.observable(1)},ko.applyBindings(n,e[0]),expect(n.value.peek()).toEqual(1),e.spinner("value",55),expect(n.value.peek()).toEqual(55),e.spinner("stepUp"),expect(n.value.peek()).toEqual(56),runs(function(){e.spinner("widget").find(".ui-spinner-up").mousedown().mouseup(),setTimeout(function(){expect(e.spinner("value")).toEqual(57),expect(n.value.peek()).toEqual(56),e.blur(),setTimeout(function(){t=!0},150)},150)}),waitsFor(function(){return t},"latch wasn't opened",1e3),runs(function(){expect(n.value.peek()).toEqual(57),ko.removeNode(e[0])})}),it("should write the widget's value immediately to the viewmodel's bound property when it changes if \"valueUpdate\" binding is also used on the input.",function(){var e,t;e=$("<input data-bind=\"valueUpdate: 'afterkeydown', spinner: { value: value }\" />").prependTo("body"),t={value:ko.observable(100)},ko.applyBindings(t,e[0]),e.spinner("widget").find(".ui-spinner-up").mousedown().mouseup(),expect(t.value.peek()).toEqual(101),ko.removeNode(e[0])}),it("should write the element to the widget observable",function(){var e,t,n;e=$('<div data-bind="spinner: { widget: widget, disabled: true }"></div>').prependTo("body"),t={widget:ko.observable()},ko.applyBindings(t,e[0]),expect(t.widget()).toBeDefined(),n=t.widget().spinner("option","disabled"),expect(n).toBe(!0),ko.removeNode(e[0])})})})()}.call(e),t})})(this);