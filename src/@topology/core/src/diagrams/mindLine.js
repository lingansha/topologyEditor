export function mindLine(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x, y + height);
    path.lineTo(x + width, y + height);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function mindLineAnchors(pen) {
    var points = [
        {
            x: 0,
            y: 1,
        },
        {
            x: 1,
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
//# sourceMappingURL=mindLine.js.map