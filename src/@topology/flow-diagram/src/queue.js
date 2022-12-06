export function flowQueue(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ex = _a.ex, ey = _a.ey;
    path.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
    path.moveTo(x + width / 2, ey);
    path.lineTo(ex, ey);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=queue.js.map