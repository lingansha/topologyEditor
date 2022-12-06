export function file(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    var offsetX = width / 6;
    path.moveTo(x, y);
    path.lineTo(ex - offsetX, y);
    path.lineTo(ex, y + offsetX);
    path.lineTo(ex, ey);
    path.lineTo(x, ey);
    path.closePath();
    path.moveTo(ex - offsetX, y);
    path.lineTo(ex - offsetX, y + offsetX);
    path.lineTo(ex, y + offsetX);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=file.js.map