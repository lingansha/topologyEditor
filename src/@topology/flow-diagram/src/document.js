export function flowDocument(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ex = _a.ex, center = _a.center;
    var centerX = center.x;
    var rightBottomY = y + (height * 6) / 7;
    var offsetY = height / 6;
    path.moveTo(x, y);
    path.lineTo(ex, y);
    path.lineTo(ex, rightBottomY);
    path.bezierCurveTo(ex - 20, rightBottomY - offsetY, centerX + width / 5, rightBottomY - offsetY, centerX, rightBottomY);
    path.bezierCurveTo(centerX - width / 5, rightBottomY + offsetY, x, rightBottomY + offsetY, x, rightBottomY);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function flowDocumentAnchors(pen) {
    var points = [
        {
            x: 0.5,
            y: 0,
        },
        {
            x: 1,
            y: 0.5,
        },
        {
            x: 0.5,
            y: 6 / 7,
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
//# sourceMappingURL=document.js.map