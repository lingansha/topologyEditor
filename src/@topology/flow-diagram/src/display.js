export function flowDisplay(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ex = _a.ex, ey = _a.ey;
    var offsetX = width / 8;
    path.moveTo(x + offsetX, y);
    path.lineTo(ex - offsetX, y);
    path.bezierCurveTo(ex + offsetX / 3, y, ex + offsetX / 3, ey, ex - offsetX, ey);
    path.lineTo(x + offsetX, ey);
    path.lineTo(x, y + height / 2);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=display.js.map