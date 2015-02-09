var originalSource = "";
var lastMethod = "RGB";
var threshTimer;
var viewer;

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
    }
    location.href = "http://" + location.host + location.pathname + "#" + method + "=" + a + "&" + b + "&" + c;
    viewer.source.tilesUrl = url.join("/");
    viewer.drawer.reset();
    viewer.drawer.update();
}

$(document).ready(function() {
    { // Threshold UI
        var a = $(".thresholdselector");
        a[0].id = "channel1";
        var b = a.clone();
        b[0].id = "channel2";
        b.appendTo(a.parent());
        var c = b.clone();
        c[0].id = "channel3";
        c.appendTo(a.parent());
    }

    viewer = new OpenSeadragon({
        id: "view",
        tileSources: tileSourcesArray,
        preserveViewport: true,
        prefixUrl: imagePrefixURL,
        showNavigator: true,
        showHomeControl: false,
        showFullPageControl: false,
        showReferenceStrip: true,
        //referenceStripHeight: 50,
        referenceStripWidth: 50,
        //referenceStripSizeRatio: 0.15,
        showRotationControl: true,
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
        timeout: 120000,
        debugMode:       true,
        debugGridColor:  "#f9276f",
    });

    viewer.addHandler("open", function() {
        originalSource = viewer.source.tilesUrl;
        $("#name .filename")[0].innerHTML = originalSource;
        $("#macroFile1")[0].href = originalSource + "semi-macro/7000_7000.jpeg";
        $("#macroFile2")[0].href = originalSource + "semi-macro/5000_5000.jpeg";
        $("#macroFile3")[0].href = originalSource + "semi-macro/3000_3000.jpeg";
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
        refreshTiles(viewer);
    });
	
    $(".inverting input").on("change", function() {
        if ($("#sett_butt")[0].checked) {
            bufferedRefreshTiles(viewer);
        }
    });
    $("#change_input .channel-slider").slider({
        range: true,
        min: 0,
        max: 255,
        values: [0, 255],
        change: function(event, ui) {
            o = $(this).parent()
            o.find("span.channel-value")[0].innerHTML = ui.values[0] + "-" + ui.values[1];
            if ($("#sett_butt")[0].checked) {
                bufferedRefreshTiles(viewer);
            }
        },
        slide: function(event, ui) {
            o = $(this).parent();
            o.find("span.channel-value")[0].innerHTML = ui.values[0] + "-" + ui.values[1];
        }
    });



	for (i=0;i<2;i++) {
		for (j=0;j<2;j++) {
			theEnd=[".low",".high"][i];
			theDirection=[".less",".more"][j];
			$(theEnd+theDirection).on("click", function() {
				e=$(this).hasClass("high");
				d=$(this).hasClass("more");
				slider = $(this).parent().find(".channel-slider");
				values = slider.slider("option", "values");
				delta=(d?1:-1);
				values=[values[0]+(e?0:delta),values[1]+(e?delta:0)];
				slider.slider("option", "values", values);
			});
		}
	}			
	
    $("#change_input .ui-slider-range").css({
        opacity: 0.75
    });
    $("#method").on("change", function() {
        refreshTiles(viewer);
        $("#change_input .channel-slider").removeClass(lastMethod)
        $("#change_input .channel-slider").addClass($("#method")[0].selectedOptions[0].innerHTML)
        lastMethod = $("#method")[0].selectedOptions[0].innerHTML;
    });
    //$("#upd_butt").button();
    $("#upd_butt").on("click", function() {
        refreshTiles(viewer);
    });
    //$("#change_input option,select,input,td,label,span,button").css('font-size', '12px');
    if (location.hash.length > 1) {
        hash = location.hash.substring(1).split("=");
        method = hash[0];
		$("#method").val(method);
        vals = hash[1].split("&");
        for (i = 0; i < 3; i++) {
            slider = $($(".channel-slider")[i]);
            val = vals[i].split(":");
            val = [Number(val[0]), Number(val[1])];
            if (val[0] < 0 || val[1] < 0) {
                val[0] *= -1;
                val[1] *= -1;
                $(".inverting input")[i].checked = true;
            }
            slider.slider("option", "values", val);
        }
        $("#sett_butt")[0].checked = true;
        bufferedRefreshTiles(viewer);
    }
});
