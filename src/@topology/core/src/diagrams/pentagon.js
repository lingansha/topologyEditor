export function pentagon(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x + width / 2, y);
    path.lineTo(x + width, y + (height * 2) / 5);
    path.lineTo(x + (width * 4) / 5, y + height);
    path.lineTo(x + width / 5, y + height);
    path.lineTo(x, y + (height * 2) / 5);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function pentagonAnchors(pen) {
    var points = [
        {
            x: 0.5,
            y: 0,
        },
        {
            x: 1,
            y: 0.4,
        },
        {
            x: 0.8,
            y: 1,
        },
        {
            x: 0.2,
            y: 1,
        },
        {
            x: 0,
            y: 0.4,
        },
    ];
    pen.anchors = points.map(function (_a, index) {
        var x = _a.x, y = _a.y;
        return {
            id: "" + index,
            penId: pen.id,
            x: x,
            y: y,
        };
    });
}
//# sourceMappingURL=pentagon.js.map