export function focus(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.rect(x, y, width, height);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=focus.js.map