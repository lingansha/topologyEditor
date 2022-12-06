export function flowDb(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, height = _a.height, ex = _a.ex, ey = _a.ey;
    var offsetY = height / 7;
    path.moveTo(x, y + offsetY);
    path.bezierCurveTo(x, (y - offsetY / 2) | 0, ex, (y - offsetY / 2) | 0, ex, y + offsetY);
    path.lineTo(ex, ey - offsetY);
    path.bezierCurveTo(ex, (ey + offsetY / 2) | 0, x, (ey + offsetY / 2) | 0, x, ey - offsetY);
    path.closePath();
    path.moveTo(x, ey - offsetY);
    path.bezierCurveTo(x, (ey - offsetY * 2) | 0, ex, (ey - offsetY * 2) | 0, ex, ey - offsetY);
    //   path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=db.js.map