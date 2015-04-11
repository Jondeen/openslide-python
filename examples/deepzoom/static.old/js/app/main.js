
define(
	[
		'knockout',
		'jquery', 
		'openseadragon',
		'i-color',
		'OpenSeadragonImagingHelper',
        'knockout-jqueryui/button',
        'knockout-jqueryui/slider',
        'knockout-jqueryui/dialog',
        'knockout-jqueryui/selectmenu'
	],
	
	function (ko) {
		
	/* Helpers */
	function deb() { if (location.hash == "#deb") debugger;}	 
	dt = function() {
		now = (new Date()).getTime();
		console.log(now - then);
		then = now;
	}

	
	/* Constants */
	var SeadragonInitParams = {
		id: "view",
		zoomInButton: "zoom-in",
		zoomOutButton:  "zoom-out",
		nextButton:     "next",
		previousButton: "previous",
		tileSources: tileSourcesArray,
		preserveViewport: true,
		prefixUrl: imagePrefixURL,
		showNavigator: true,
		showHomeControl: false,
		showFullPageControl: false,
		showReferenceStrip: true,
		referenceStripSizeRatio: 0.05,
		showRotationControl: true,
		animationTime: 0.5,
		blendTime: 0.1,
		constrainDuringPan: true,
		maxZoomPixelRatio: 1,
		minZoomLevel: 2,
		visibilityRatio: 1,
		zoomPerScroll: 2,
		timeout: 120000,
		debugMode: false,
		debugGridColor: "#000000",
	};
	
	/* Semi-globals */
	var originalSource = "";
	var lastMethod = "RGB";
	var threshTimer;
	var viewer;
	var helper;
	var snapStore;
	var oldData;
	
	/* Models */
	function Channel(model) {
		HIGH = 1, LOW = 0, INC = 1, DEC = 0;
		var self = this;
		self.model = model
		self.id = self.model.channelCount;
		self.minVal = ko.observable('10');
		self.maxVal = ko.observable('75');
		self.inverted = ko.observable(false);
		self.values = ko.computed({
			read: function() {
				return [self.minVal(), self.maxVal()];
			},
			write: function(newValue) {
				self.minVal(newValue[0]);
				self.maxVal(newValue[1]);
			},
			owner: self
		});
		self.calcValues = ko.computed(function() {
			inv = self.inverted() ? -1 : 1;
			return [self.minVal() * inv, self.maxVal() * inv];
		}, self);

		self.nudge = function(sliderEnd, sliderDirection) {
			theEnds = [Number(self.minVal()), Number(self.maxVal())];
			theDirection = [-1, +1];
			theEnds[sliderEnd] += theDirection[sliderDirection];
			self.values(theEnds);
		}

		self.calcValues.subscribe(function() {
			bufferedRefreshTiles(self.model);
		});

		self.test = function(v) {
			if (v <= self.maxVal())
				if (v >= self.minVal()) return true;
			return false;
		}
		return self;
	};
	function ChannelsUI() {
		var self = this;
		self.inBrowser = true;
		self.onServer = !inBrowser;
		self.channelCount = 0;
		
		self.colorspaces_choices = ['hex', 'hsv', 'lab', 'rgb', 'xyz'];
		self.colorspace=ko.observable();
		// self.colorspace.subscribe(function() {
			// bufferedRefreshTiles(self);
		// });

		self.channels = [];
		while (self.channelCount < 3) self.channels[self.channelCount++] = (new Channel(self));

		self.enabled = ko.observable(false);

		self.enabled.subscribe(function() {
			if (!self.enabled()) {
				refreshTiles(self);
			} else {
			bufferedRefreshTiles(self);
			}
		});
		self.count = function() {
			if (inBrowser) {
				c = $(".openseadragon-canvas canvas")[0];
				ctx = c.getContext("2d");
				now = (new Date()).getTime();
				then = now;

				dt();
				countContext(ctx);
				dt();
				countContext2(ctx);
				dt();
				countContext(ctx, true);
				dt();
			}
		}

		self.overlay = function() {
			addOverlay(15000,15000,2000);
		}
		
		return self;
	}

	/* Deprecated */
	function bufferedRefreshTiles(model) {
		refreshTiles(model,true);
	}

	/* Update methods */
	function refreshTiles(model,buffered) {
		if (threshTimer) {
			clearTimeout(threshTimer);
		}
		
		if (buffered && model.enabled()) {
			threshTimer = setTimeout(function() {
				refreshTiles(model)
			}, 1500);
			return;
		}

		a = model.channels[0].calcValues();
		b = model.channels[1].calcValues();
		c = model.channels[2].calcValues();
		m = model.colorspace();
		h = location.host;
		p = location.pathname;

		url = originalSource.split("/");

		if (model.enabled()) {
			url.splice(url.length - 1, 0, "thresholded", m, a, b, c);
			location.href = "http://" + h + p + "#" + m + "=" + a + "&" + b + "&" + c;
		} else {
			location.href = "http://" + h + p + "#";
		}

		viewer.source.tilesUrl = url.join("/");
		viewer.drawer.reset();
		viewer.drawer.update();

	}

	/* Init method */
	
	$(function() { 
		viewer = new OpenSeadragon(SeadragonInitParams);
		helper=viewer.activateImagingHelper();

		viewer.addHandler("open", function() {
			originalSource = viewer.source.tilesUrl;
			$("#name .filename")[0].innerHTML = originalSource;
			$(viewer.element).find('.navigator').css('background-color', 'transparent');
		});


		$("#name").position({
			my: "center top ",
			at: "center top ",
			of: $(".openseadragon-container")
		});
		
		$("#currentFile").on("click", function() {
			var c = $(".openseadragon-canvas canvas")[0];
			var dataString = c.toDataURL("image/png");
			var d = window.open().document;
			d.write('');
			d.close();
			d.body.appendChild(document.createElement('img')).src = dataString;
		});

		dialog = $("#change-input").dialog({
			position: {
				my: "left middle",
				at: "left middle"
			},
			minWidth: 330
		});
		
		dialog.addClass("no-close");

		dialog.find("input").attr('size', 2);
		
		dialog.find("form").submit(function(event) {
			event.preventDefault();
		});


		$("#matrix").on("change", function() {
			//viewer.debugMode = $("#matrix")[0].checked;
			//refreshTiles(viewer);
		});
		
		titlebar=$(".ui-dialog-titlebar");
		titlebar[0].lastElementChild.remove();
		titlebar.append($("#conButtons")[0].children);
		$("#conButtons").remove();
		dialogState="visible";
		dialogMinHeight="20px";
		dialogMaxHeight="120px";
		dialogClickEnabled=true;
		$(".ui-dialog-titlebar .ui-icon").on("click", function() {
			dialogClickEnabled = false;
			setTimeout(function(){dialogClickEnabled = true;},100);
		});
		titlebar.parent().draggable({
			stop: function() {
			dialogClickEnabled = false;
			setTimeout(function(){dialogClickEnabled = true;},100);
			}
		});
		titlebar.on("click",function() {
			if (dialogClickEnabled) {
				dialog = $(this).parent();
				if (dialogState=="hidden") {
					dialog.animate({height: dialogMaxHeight},100);
					dialogState="visible";
				} else {
					dialogMaxHeight=dialog.css("height");
					dialog.animate({height: dialogMinHeight},100);
					dialogState="hidden";
				}
			}
		});
		
		 var imagingHelper = viewer.activateImagingHelper({onImageViewChanged: onImageViewChanged});

		function onImageViewChanged(event) {
			// event.viewportWidth == width of viewer viewport in logical coordinates relative to image native size
			// event.viewportHeight == height of viewer viewport in logical coordinates relative to image native size
			// event.viewportOrigin == OpenSeadragon.Point, top-left of the viewer viewport in logical coordinates relative to image
			// event.viewportCenter == OpenSeadragon.Point, center of the viewer viewport in logical coordinates relative to image
			// event.zoomFactor == current zoom factor

			
		}


		ko.applyBindings(ChannelsUI);
		$("#change-input").disableSelection();
		
	});

	addOverlay = function(a,b,c) {
		var s=1; //Stroke
		var svgNode = (typeof viewer._svgOverlayInfo === 'undefined') ? viewer.svgOverlay():viewer.svgOverlay;
		var lp=helper.vectorToVector(a,b,'d','l');
		var c=helper.vectorToDistance(c,0,'d','l');
		var s=helper.vectorToDistance(s,0,'d','l');
		
		d3.select(svgNode).append("rect")
			.style('opacity', 0.3)
			.style('fill', '#f00')
			.attr("x", lp.x)
			.attr("width", c)
			.attr("y", lp.y)
			.attr("height", c);
	}

    // Load any app-specific modules
    // with a relative require call,
    // like:
    // var messages = require('./messages');
});