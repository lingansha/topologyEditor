export function people(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, ex = _a.ex, ey = _a.ey;
    var r = width / 4;
    var middle = x + width / 2;
    path.arc(middle, y + r, r, 0, Math.PI * 2);
    path.moveTo(x, y + r * 3);
    path.lineTo(ex, y + r * 3);
    path.moveTo(middle, y + r * 2);
    path.lineTo(middle, y + r * 4);
    path.moveTo(middle, y + r * 4);
    path.lineTo(x, ey);
    path.moveTo(middle, y + r * 4);
    path.lineTo(ex, ey);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=people.js.map