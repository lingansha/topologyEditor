export function cube(ctx, pen) {
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    var offset = width * 0.25;
    var z = pen.z;
    if (z > 1) {
        offset = z;
    }
    else if (z > 0) {
        offset = width * z;
    }
    var p1 = {
        x: x,
        y: y + offset,
    };
    var p2 = {
        x: ex - offset,
        y: y + offset,
    };
    var p3 = {
        x: ex - offset,
        y: ey,
    };
    var p4 = {
        x: x,
        y: ey,
    };
    // front
    face(ctx, [p1, p2, p3, p4], pen.backgroundFront || pen.background, pen.color);
    // up
    face(ctx, [
        p1,
        {
            x: x + offset,
            y: y,
        },
        { x: ex, y: y },
        p2,
    ], pen.backgroundUp || pen.background, pen.color);
    // right
    face(ctx, [
        p2,
        { x: ex, y: y },
        {
            x: ex,
            y: ey - offset,
        },
        p3,
    ], pen.backgroundRight || pen.background, pen.color);
}
function face(ctx, points, fillStyle, strokeStyle) {
    if (fillStyle === void 0) { fillStyle = ''; }
    if (strokeStyle === void 0) { strokeStyle = ''; }
    ctx.save();
    fillStyle && (ctx.fillStyle = fillStyle);
    strokeStyle && (ctx.strokeStyle = strokeStyle);
    ctx.beginPath();
    for (var i = 0; i < points.length; ++i) {
        if (i) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        else {
            ctx.moveTo(points[i].x, points[i].y);
        }
    }
    ctx.closePath();
    fillStyle && ctx.fill();
    ctx.stroke();
    ctx.restore();
}
//# sourceMappingURL=cube.js.map