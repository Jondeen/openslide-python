var originalSource = "";
var lastMethod = "RGB";
var threshTimer;
var viewer;

function Channel(n) {
	var self = this;
	self.id = n;
	self.minVal = ko.observable('0');
	self.maxVal = ko.observable('255');
	self.inverted = ko.observable(false);
	self.values = ko.computed({
		read: function() {
			return [this.minVal(),this.maxVal()];
		},
		write: function(newValue) {
			this.minVal(newValue[0]);
			this.maxVal(newValue[1]);
		},
		owner: this
	});
	self.checked=ko.observable(false);
	return self;
};

channels = [];
for (i=0; i < 3; i++) channels[i] = (new Channel(i));

function bufferedRefreshTiles(viewer) {
    if (threshTimer) {
        clearTimeout(threshTimer);
    }
    threshTimer = setTimeout(function() {
        refreshTiles(viewer)
    }, 500);
}


function refreshTiles(viewer) {
    if (threshTimer) {
        clearTimeout(threshTimer);
    }
    a = $("#channel1 .channel-slider").slider("values");
    b = $("#channel2 .channel-slider").slider("values");
    c = $("#channel3 .channel-slider").slider("values");
    if ($("#channel1 .inverting input")[0].checked) {
        a[0] *= -1;
        a[1] *= -1;
    }
    if ($("#channel2 .inverting input")[0].checked) {
        b[0] *= -1;
        b[1] *= -1;
    }
    if ($("#channel3 .inverting input")[0].checked) {
        c[0] *= -1;
        c[1] *= -1;
    }

    a = a.join(":");
    b = b.join(":");
    c = c.join(":");

    method = $("#method")[0].selectedOptions[0].innerHTML;
    url = originalSource.split("/");
	
    if ($("#sett_butt")[0].checked) {
        url.splice(4, 0, "thresholded", method, a, b, c);
		location.href = "http://" + location.host + location.pathname + "#" + method + "=" + a + "&" + b + "&" + c;
    } else {
		location.href = "http://" + location.host + location.pathname + "#";
	}
	
    viewer.source.tilesUrl = url.join("/");
    viewer.drawer.reset();
    viewer.drawer.update();
}



$(document).ready(function() {

    viewer = new OpenSeadragon({
        id: "view",
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
        debugMode:       false,
        debugGridColor:  "#000000",
    });

    viewer.addHandler("open", function() {
        originalSource = viewer.source.tilesUrl;
        $("#name .filename")[0].innerHTML = originalSource;
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
	
    dialog = $("#change_input").dialog({
        position: {
            my: "left middle",
            at: "left middle"
        },
        minWidth: 330
    }).addClass("no-close");
	
    dialog.find("input").attr('size', 3);
    dialog.find("form").submit(function(event) {
        event.preventDefault();
    });
	
    $("#sett_butt").on("change", function() {
        //refreshTiles(viewer);
    });

    $("#matrix").on("change", function() {
        //viewer.debugMode = $("#matrix")[0].checked;
        //refreshTiles(viewer);
    });
	
    $(".inverting input").on("change", function() {
        if ($("#sett_butt")[0].checked) {
            //bufferedRefreshTiles(viewer);
        }
    });
    

	ko.applyBindings(channels);
});
