export function flowManually(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, height = _a.height, ex = _a.ex, ey = _a.ey;
    var offsetY = height / 4;
    path.moveTo(x, y + offsetY);
    path.lineTo(ex, y);
    path.lineTo(ex, ey);
    path.lineTo(x, ey);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function flowManuallyAnchors(pen) {
    var points = [
        {
            x: 0.5,
            y: 0.125,
        },
        {
            x: 1,
            y: 0.5,
        },
        {
            x: 0.5,
            y: 1,
        },
        {
            x: 0,
            y: 0.5,
        },
    ];
    pen.anchors = points.map(function (_a, index) {
        var x = _a.x, y = _a.y;
        return {
            id: "".concat(index),
            penId: pen.id,
            x: x,
            y: y,
        };
    });
}
//# sourceMappingURL=manually.js.map