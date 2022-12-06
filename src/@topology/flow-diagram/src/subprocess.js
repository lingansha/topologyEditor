export function flowSubprocess(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    var offsetX = width / 7;
    path.moveTo(x, y);
    path.lineTo(ex, y);
    path.lineTo(ex, ey);
    path.lineTo(x, ey);
    path.closePath();
    path.moveTo(x + offsetX, y);
    path.lineTo(x + offsetX, ey);
    path.moveTo(ex - offsetX, y);
    path.lineTo(ex - offsetX, ey);
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=subprocess.js.map