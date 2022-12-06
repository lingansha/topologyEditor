export function triangle(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x + width / 2, y);
    path.lineTo(x + width, y + height);
    path.lineTo(x, y + height);
    path.lineTo(x + width / 2, y);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function triangleAnchors(pen) {
    var points = [
        {
            x: 0.5,
            y: 0,
        },
        {
            x: 0.75,
            y: 0.5,
        },
        {
            x: 0.5,
            y: 1,
        },
        {
            x: 0.25,
            y: 0.5,
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
//# sourceMappingURL=triangle.js.map