export function flowData(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    var penOffsetX = pen.offsetX;
    var offsetX = width / 7;
    if (penOffsetX > 1) {
        offsetX = penOffsetX;
    }
    else if (penOffsetX > 0) {
        offsetX = width * penOffsetX;
    }
    path.moveTo(x + offsetX, y);
    path.lineTo(ex, y);
    path.lineTo(x + width - offsetX, ey);
    path.lineTo(x, ey);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=data.js.map