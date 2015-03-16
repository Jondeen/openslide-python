var originalSource = "";
var lastMethod = "RGB";
var threshTimer;
var viewer;

function deb() {
    if (location.hash == "#deb") {
        debugger;
    }
}

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
    self.colorspaces_choices.theSelected = ko.observable();

    self.colorspaces_choices.theSelected.subscribe(function() {
        bufferedRefreshTiles(self);
    });

    self.channels = [];
    while (self.channelCount < 3) self.channels[self.channelCount++] = (new Channel(self));

    self.enabled = ko.observable(true);

    self.enabled.subscribe(function() {
        bufferedRefreshTiles(self);
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

    return self;
}

function bufferedRefreshTiles(model) {
    if (threshTimer) {
        clearTimeout(threshTimer);
    }
    threshTimer = setTimeout(function() {
        refreshTiles(model)
    }, 1500);
}

function refreshTiles(model) {
    if (threshTimer) {
        clearTimeout(threshTimer);
    }
    a = model.channels[0].calcValues();
    b = model.channels[1].calcValues();
    c = model.channels[2].calcValues();
    m = model.colorspaces_choices.theSelected();
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


function countContext(ctx, displayCount) {
    var payload = {
        i: 0,
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        t: 0,
        c: 0,
        ctxData: null,
        data: null,
        ctx: ctx
    }

    var logics = {
        init: function(payload) {},
        run: function(payload) {},
        finish: function(payload) {}
    }

    if (displayCount == true) {
        logics.init = function(payload) {
            payload.ctxData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            var data = payload.ctxData.data;
            payload.data = data;
        };

        logics.run = function(payload) {
            payload.data[payload.i] = 0; //red
            payload.data[payload.i + 1] = 0; //green
            payload.data[payload.i + 2] = 0; //blue
            payload.c++;
        };
        logics.finish = function(payload) {
            payload.ctx.putImageData(payload.ctxData, 0, 0);
        }
    } else {
        logics.init = function(payload) {
            payload.ctxData = payload.ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            payload.data = payload.ctxData.data;
        };

        logics.run = function(payload) {
            payload.c++;
        };

        logics.finish = function(payload) {}
    }
    pl = payload;
    logics.init(pl);
    while (pl.i < pl.data.length) {
        pl.r = pl.data[pl.i]; //red
        pl.g = pl.data[pl.i + 1]; //green
        pl.b = pl.data[pl.i + 2]; //blue
        pl.a = pl.data[pl.i + 3]; //alpha
        if (testColor(pl.r, pl.g, pl.b, pl.a)) logics.run(pl);
        pl.t++;
        pl.i += 4;

    }
    logics.finish(pl);

    console.log(pl.t);
    console.log(pl.c);
    console.log(pl.c / pl.t);
}

function countContext2(ctx) {
    var i = 0,
        r = 0,
        g = 0,
        b = 0,
        a = 0,
        t = 0,
        c = 0,
        ctxData = null,
        data = null,
        ctx = ctx;

    ctxData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    data = ctxData.data;


    while (i < data.length) {
        r = data[i]; //red
        g = data[i + 1]; //green
        b = data[i + 2]; //blue
        a = data[i + 3]; //alpha
        if (testColor(r, g, b, a)) c++;
        t++;
        i += 4;
    }

    console.log(t);
    console.log(c);
    console.log(c / t);
}

function testColor(r, g, b, a) {
    cs = colorspaces_choices.theSelected();
    c = {
        r: r,
        g: g,
        b: b
    };
    c = IColor(c, cs);
    for (n = 0; n < 3; n++)
        if (!channels[n].test(c[cs[n]])) return false;
    if (a == 255) return true;
    return false;
}




$(document).ready(function() {

    viewer = new OpenSeadragon({
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
    });

    viewer.addHandler("open", function() {
        originalSource = viewer.source.tilesUrl;
        $("#name .filename")[0].innerHTML = originalSource;
        $(viewer.element).find('.navigator').css('background-color', 'transparent');
		

        // Loadtime efficency Hack
        viewer.source.minLevel = 8;
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
    }).addClass("no-close");

    dialog.find("input").attr('size', 2);
	
    dialog.find("form").submit(function(event) {
        event.preventDefault();
    });


    $("#matrix").on("change", function() {
        //viewer.debugMode = $("#matrix")[0].checked;
        //refreshTiles(viewer);
    });
	dialogState="visible";
	dialogMinHeight="20px";
	dialogMaxHeight="120px";
	$(".ui-dialog-titlebar").on("click",function() {
		dialog = $(this).parent();
		console.log(dialog.css("height"));
		if (dialogState=="hidden") {
			dialog.animate({height: dialogMaxHeight},100);
			dialogState="visible";
		} else {
			dialogMaxHeight=dialog.css("height");
			dialog.animate({height: dialogMinHeight},100);
			dialogState="hidden";
		}
	});


    ko.applyBindings(ChannelsUI);
    $("#change-input").disableSelection();
	
	titlebar=$(".ui-dialog-titlebar");
	titlebar[0].lastElementChild.remove();
	titlebar.append($("#conButtons")[0].children);
	$("#conButtons").remove();
});

dt = function() {
    now = (new Date()).getTime();
    console.log(now - then);
    then = now;
}