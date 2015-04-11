(function(e){var t;define([],function(){return function(){describe("Binding: With",function(){beforeEach(jasmine.prepareTestNode),it("Should remove descendant nodes from the document (and not bind them) if the value is falsey",function(){testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: someItem.nonExistentChildProp'></span></div>",expect(testNode.childNodes[0].childNodes.length).toEqual(1),ko.applyBindings({someItem:null},testNode),expect(testNode.childNodes[0].childNodes.length).toEqual(0)}),it("Should leave descendant nodes in the document (and bind them in the context of the supplied value) if the value is truthy",function(){testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: existentChildProp'></span></div>",expect(testNode.childNodes.length).toEqual(1),ko.applyBindings({someItem:{existentChildProp:"Child prop value"}},testNode),expect(testNode.childNodes[0].childNodes.length).toEqual(1),expect(testNode.childNodes[0].childNodes[0]).toContainText("Child prop value")}),it("Should leave descendant nodes unchanged if the value is truthy",function(){var e=ko.observable({childProp:"child prop value"});testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: childProp'></span></div>";var t=testNode.childNodes[0].childNodes[0];ko.applyBindings({someItem:e},testNode),expect(testNode.childNodes[0].childNodes[0]).toContainText("child prop value"),expect(testNode.childNodes[0].childNodes[0]).toEqual(t)}),it("Should toggle the presence and bindedness of descendant nodes according to the truthiness of the value, performing binding in the context of the value",function(){var e=ko.observable(undefined);testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: occasionallyExistentChildProp'></span></div>",ko.applyBindings({someItem:e},testNode),expect(testNode.childNodes[0].childNodes.length).toEqual(0),e({occasionallyExistentChildProp:"Child prop value"}),expect(testNode.childNodes[0].childNodes.length).toEqual(1),expect(testNode.childNodes[0].childNodes[0]).toContainText("Child prop value"),e(null),expect(testNode.childNodes[0].childNodes.length).toEqual(0)}),it("Should reconstruct and bind descendants when the data item notifies about mutation",function(){var e=ko.observable({childProp:"Hello"});testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: childProp'></span></div>",ko.applyBindings({someItem:e},testNode),expect(testNode.childNodes[0].childNodes[0]).toContainText("Hello"),e().childProp="Goodbye",e.valueHasMutated(),expect(testNode.childNodes[0].childNodes[0]).toContainText("Goodbye")}),it("Should not bind the same elements more than once even if the supplied value notifies a change",function(){var e=0,t=ko.observable({childProp:ko.observable("Hello"),handleClick:function(){e++}});testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: childProp, click: handleClick'></span></div>",ko.applyBindings({someItem:t},testNode),expect(testNode.childNodes[0].childNodes[0]).toContainText("Hello"),expect(t().childProp.getSubscriptionsCount()).toEqual(1),ko.utils.triggerEvent(testNode.childNodes[0].childNodes[0],"click"),expect(e).toEqual(1),t.valueHasMutated(),expect(t().childProp.getSubscriptionsCount()).toEqual(1),e=0,ko.utils.triggerEvent(testNode.childNodes[0].childNodes[0],"click"),expect(e).toEqual(1)}),it("Should be able to access parent binding context via $parent",function(){testNode.innerHTML="<div data-bind='with: someItem'><span data-bind='text: $parent.parentProp'></span></div>",ko.applyBindings({someItem:{},parentProp:"Parent prop value"},testNode),expect(testNode.childNodes[0].childNodes[0]).toContainText("Parent prop value")}),it("Should be able to access all parent binding contexts via $parents, and root context via $root",function(){testNode.innerHTML="<div data-bind='with: topItem'><div data-bind='with: middleItem'><div data-bind='with: bottomItem'><span data-bind='text: name'></span><span data-bind='text: $parent.name'></span><span data-bind='text: $parents[1].name'></span><span data-bind='text: $parents[2].name'></span><span data-bind='text: $root.name'></span></div></div></div>",ko.applyBindings({name:"outer",topItem:{name:"top",middleItem:{name:"middle",bottomItem:{name:"bottom"}}}},testNode);var e=testNode.childNodes[0].childNodes[0].childNodes[0];expect(e.childNodes[0]).toContainText("bottom"),expect(e.childNodes[1]).toContainText("middle"),expect(e.childNodes[2]).toContainText("top"),expect(e.childNodes[3]).toContainText("outer"),expect(e.childNodes[4]).toContainText("outer"),expect(ko.contextFor(testNode).$data.name).toEqual("outer"),expect(ko.contextFor(testNode.childNodes[0]).$data.name).toEqual("outer"),expect(ko.contextFor(testNode.childNodes[0].childNodes[0]).$data.name).toEqual("top"),expect(ko.contextFor(testNode.childNodes[0].childNodes[0].childNodes[0]).$data.name).toEqual("middle"),expect(ko.contextFor(testNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0]).$data.name).toEqual("bottom");var t=testNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0];expect(t.tagName).toEqual("SPAN"),expect(ko.contextFor(t).$data.name).toEqual("bottom"),expect(ko.contextFor(t).$root.name).toEqual("outer"),expect(ko.contextFor(t).$parents[1].name).toEqual("top")}),it('Should be able to define an "with" region using a containerless template',function(){var e=ko.observable(undefined);testNode.innerHTML='hello <!-- ko with: someitem --><span data-bind="text: occasionallyexistentchildprop"></span><!-- /ko --> goodbye',ko.applyBindings({someitem:e},testNode),expect(testNode).toContainHtml("hello <!-- ko with: someitem --><!-- /ko --> goodbye"),e({occasionallyexistentchildprop:"child prop value"}),expect(testNode).toContainHtml('hello <!-- ko with: someitem --><span data-bind="text: occasionallyexistentchildprop">child prop value</span><!-- /ko --> goodbye'),e(null),expect(testNode).toContainHtml("hello <!-- ko with: someitem --><!-- /ko --> goodbye")}),it('Should be able to nest "with" regions defined by containerless templates',function(){testNode.innerHTML='hello <!-- ko with: topitem -->Got top: <span data-bind="text: topprop"></span><!-- ko with: childitem -->Got child: <span data-bind="text: childprop"></span><!-- /ko --><!-- /ko -->';var e={topitem:ko.observable(null)};ko.applyBindings(e,testNode),expect(testNode).toContainHtml("hello <!-- ko with: topitem --><!-- /ko -->"),e.topitem({topprop:"property of top",childitem:ko.observable()}),expect(testNode).toContainHtml('hello <!-- ko with: topitem -->got top: <span data-bind="text: topprop">property of top</span><!-- ko with: childitem --><!-- /ko --><!-- /ko -->'),e.topitem().childitem({childprop:"property of child"}),expect(testNode).toContainHtml('hello <!-- ko with: topitem -->got top: <span data-bind="text: topprop">property of top</span><!-- ko with: childitem -->got child: <span data-bind="text: childprop">property of child</span><!-- /ko --><!-- /ko -->'),e.topitem(null),expect(testNode).toContainHtml("hello <!-- ko with: topitem --><!-- /ko -->")})})}.call(e),t})})(this);