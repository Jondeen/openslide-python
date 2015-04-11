(function(e){var t;define([],function(){return function(){describe("Mapping helpers",function(){it("ko.toJS should require a parameter",function(){expect(function(){ko.toJS()}).toThrow()}),it("ko.toJS should unwrap observable values",function(){var e=["hello",123,!0,null,undefined,{a:1}];for(var t=0;t<e.length;t++){var n=ko.observable(e[t]),r=ko.toJS(n);expect(ko.isObservable(r)).toEqual(!1),expect(r).toEqual(e[t])}}),it("ko.toJS should recursively unwrap observables whose values are themselves observable",function(){var e=ko.observable(ko.observable(ko.observable(ko.observable("Hello")))),t=ko.toJS(e);expect(t).toEqual("Hello")}),it("ko.toJS should unwrap observable properties, including nested ones",function(){var e={a:ko.observable(123),b:{b1:ko.observable(456),b2:[789,ko.observable("X")]}},t=ko.toJS(e);expect(t.a).toEqual(123),expect(t.b.b1).toEqual(456),expect(t.b.b2[0]).toEqual(789),expect(t.b.b2[1]).toEqual("X")}),it("ko.toJS should unwrap observable arrays and things inside them",function(){var e=ko.observableArray(["a",1,{someProp:ko.observable("Hey")}]),t=ko.toJS(e);expect(t.length).toEqual(3),expect(t[0]).toEqual("a"),expect(t[1]).toEqual(1),expect(t[2].someProp).toEqual("Hey")}),it("ko.toJS should resolve reference cycles",function(){var e={};e.someProp={owner:ko.observable(e)};var t=ko.toJS(e);expect(t.someProp.owner).toEqual(t)}),it("ko.toJS should treat Date, Number, String and Boolean instances as primitives (and not walk their subproperties)",function(){var e=new Date,t=new String,n=new Number,r=new Boolean,i=ko.toJS({due:ko.observable(e),string:ko.observable(t),number:ko.observable(n),booleanValue:ko.observable(r)});expect(i.due instanceof Date).toEqual(!0),expect(i.due).toEqual(e),expect(i.string instanceof String).toEqual(!0),expect(i.string).toEqual(t),expect(i.number instanceof Number).toEqual(!0),expect(i.number).toEqual(n),expect(i.booleanValue instanceof Boolean).toEqual(!0),expect(i.booleanValue).toEqual(r)}),it("ko.toJS should serialize functions",function(){var e={include:ko.observable("test"),exclude:function(){}},t=ko.toJS(e);expect(t.include).toEqual("test"),expect(t.exclude).toEqual(e.exclude)}),it("ko.toJSON should unwrap everything and then stringify",function(){var e=ko.observableArray(["a",1,{someProp:ko.observable("Hey")}]),t=ko.toJSON(e);expect(typeof t).toEqual("string");var n=ko.utils.parseJson(t);expect(n.length).toEqual(3),expect(n[0]).toEqual("a"),expect(n[1]).toEqual(1),expect(n[2].someProp).toEqual("Hey")}),it("ko.toJSON should respect .toJSON functions on objects",function(){var e={a:{one:"one",two:"two"},b:ko.observable({one:"one",two:"two"})};e.a.toJSON=function(){return"a-mapped"},e.b().toJSON=function(){return"b-mapped"};var t=ko.toJSON(e);expect(typeof t).toEqual("string");var n=ko.utils.parseJson(t);expect(n).toEqual({a:"a-mapped",b:"b-mapped"})}),it("ko.toJSON should respect .toJSON functions on arrays",function(){var e={a:[1,2],b:ko.observableArray([3,4])};e.a.toJSON=function(){return"a-mapped"},e.b().toJSON=function(){return"b-mapped"};var t=ko.toJSON(e);expect(typeof t).toEqual("string");var n=ko.utils.parseJson(t);expect(n).toEqual({a:"a-mapped",b:"b-mapped"})}),it("ko.toJSON should respect replacer/space options",function(){function t(t,n){return expect(n).toEqual(e),"my replacement"}var e={a:1};expect(ko.toJSON(e)).toEqual('{"a":1}'),expect(ko.toJSON(e,t)).toEqual('"my replacement"'),expect(ko.toJSON(e,undefined,"    ")).toEqualOneOf(['{\n    "a":1\n}','{\n    "a": 1\n}'])})})}.call(e),t})})(this);