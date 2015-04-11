Filters = {};
Filters.getPixels = function(img) {
    var c = this.getCanvas(img.width, img.height);
    var ctx = c.getContext('2d');
    ctx.drawImage(img);
    return ctx.getImageData(0, 0, c.width, c.height);
};
Filters.getCanvas = function(w, h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
};

function rgbToLab(r, g, b) {
    rgb={r:r, g:g, b:b};
    lab=Color.convert(rgb,'lab');
    retValue=[lab.l,lab.a,lab.b];
    return retValue;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }

    return[h, s, l];
}

function getMinsMax(color, floated) {
    var cmin = $("#" + color + "min").val();
    var cmax = $("#" + color + "max").val();
    if (floated) {
        return[float(cmin) / 255.0, float(cmax) / 255.0];
    }
    return[cmin, cmax];
}

convert = function(args, thresh) {
    var A = 0,
    B = 1,
    C = 2,
    MIN = 0,
    MAX = 1;
    if (typeof args.tile._alreadyProcessed == 'undefined') {
        args.tile._alreadyProcessed = false;
    }
    ctx = args.rendered;
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    if (!args.tile._alreadyProcessed && width > 0 && height > 0) {
        var imgd = ctx.getImageData(0, 0, width, height);
        thresh_args = {};
        for (var j = 0; j < 3; j++) {
            if (thresh[j][MIN] < 0 || thresh[j][MAX] < 0) {
                thresh[j].inverted = true;
                thresh[j][MIN] = thresh[j][MIN] * -1;
                thresh[j][MAX] = thresh[j][MAX] * -1;
            } else {
                thresh[j].inverted = false;
            }
        }
        ctx.putImageData(Filters.applyThreshold(imgd, thresh), 0, 0);
        args.tile._alreadyProcessed = true;
    }
};

Filters.applyThreshold = function(pixels, thresh) {
    var d = pixels.data;
    if (thresh.mode == "HSV") {
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = testLevels(rgbToHsl(r, g, b), thresh);
            d[i] = d[i + 1] = d[i + 2] = v;
        }
    } else if (thresh.mode == "Lab") {
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            var v = testLevels(rgbToLab(r, g, b), thresh);
            d[i] = d[i + 1] = d[i + 2] = v;
        }

    }
    return pixels;
};

function testLevels(v, thresh) {
    var MIN = 0,
    MAX = 1;
    retVal = 255;
    for (var j = 0; j < 3; j++) {
        if ((thresh[j][MIN] > v[j] || thresh[j][MAX] < v[j]) != thresh[j].inverted) {
            retVal = 0;
        }
    }
    return retVal;
}
