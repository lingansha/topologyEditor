export function diamond(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x + width / 2, y);
    path.lineTo(x + width, y + height / 2);
    path.lineTo(x + width / 2, y + height);
    path.lineTo(x, y + height / 2);
    path.lineTo(x + width / 2, y);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=diamond.js.map