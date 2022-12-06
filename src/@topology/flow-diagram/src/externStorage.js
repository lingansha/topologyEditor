export function flowExternStorage(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    var offsetX = width / 10;
    path.moveTo(x + offsetX * 2, y);
    path.bezierCurveTo(x - (offsetX * 2) / 3, y, x - (offsetX * 2) / 3, ey, x + offsetX * 2, ey);
    path.lineTo(ex, ey);
    path.bezierCurveTo(ex - offsetX, ey, ex - offsetX, y, ex, y);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=externStorage.js.map