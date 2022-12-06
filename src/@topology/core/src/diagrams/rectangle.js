export function rectangle(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var wr = pen.calculative.borderRadius || 0, hr = wr;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ex = _a.ex, ey = _a.ey;
    if (wr < 1) {
        wr = width * wr;
        hr = height * hr;
    }
    var r = wr < hr ? wr : hr;
    if (width < 2 * r) {
        r = width / 2;
    }
    if (height < 2 * r) {
        r = height / 2;
    }
    path.moveTo(x + r, y);
    path.arcTo(ex, y, ex, ey, r);
    path.arcTo(ex, ey, x, ey, r);
    path.arcTo(x, ey, x, y, r);
    path.arcTo(x, y, ex, y, r);
    if (path instanceof Path2D) {
        return path;
    }
}
export var square = rectangle;
//# sourceMappingURL=rectangle.js.map