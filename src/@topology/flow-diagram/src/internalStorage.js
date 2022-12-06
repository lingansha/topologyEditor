export function flowInternalStorage(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    path.moveTo(x, y);
    path.lineTo(ex, y);
    path.lineTo(ex, ey);
    path.lineTo(x, ey);
    path.closePath();
    var offset = width / 7;
    path.moveTo(x, y + offset);
    path.lineTo(ex, y + offset);
    path.moveTo(x + offset, y);
    path.lineTo(x + offset, ey);
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=internalStorage.js.map