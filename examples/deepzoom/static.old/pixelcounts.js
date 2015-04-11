require("i-color");
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

function testColor(r, g, b, a, cs) {
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

