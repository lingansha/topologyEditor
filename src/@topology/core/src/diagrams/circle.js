export function circle(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
    if (path instanceof Path2D) {
        return path;
    }
}
//# sourceMappingURL=circle.js.map