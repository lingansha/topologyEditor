export function flowComment(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ey = _a.ey;
    var offsetX = width / 4;
    path.moveTo(x + offsetX, y);
    path.lineTo(x, y);
    path.lineTo(x, ey);
    path.lineTo(x + offsetX, ey);
    if (path instanceof Path2D)
        return path;
}
export function flowCommentAnchors(pen) {
    var points = [
        {
            x: 0.25,
            y: 0,
        },
        {
            x: 0.25,
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
            id: index + '',
            x: x,
            y: y,
            penId: pen.id,
        };
    });
}
//# sourceMappingURL=comment.js.map