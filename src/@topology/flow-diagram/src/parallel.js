export function flowParallel(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, ex = _a.ex, ey = _a.ey;
    path.moveTo(x, y);
    path.lineTo(ex, y);
    path.moveTo(x, ey);
    path.lineTo(ex, ey);
    if (path instanceof Path2D)
        return path;
}
export function flowParallelAnchors(pen) {
    var points = [
        {
            x: 0.5,
            y: 0,
        },
        {
            x: 0.5,
            y: 1,
        },
    ];
    pen.anchors = points.map(function (_a, index) {
        var x = _a.x, y = _a.y;
        return {
            id: index + '',
            x: x,
            y: y,
            penId: pen.id,
        };
    });
}
//# sourceMappingURL=parallel.js.map