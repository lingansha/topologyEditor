export function message(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ey = _a.ey;
    path.moveTo(x, y);
    path.lineTo(x + width, y);
    path.lineTo(x + width, y + (height * 3) / 4);
    path.lineTo(x + (width * 8) / 16, y + (height * 3) / 4);
    path.lineTo(x + width / 4, ey);
    path.lineTo(x + (width * 5) / 16, y + (height * 3) / 4);
    path.lineTo(x, y + (height * 3) / 4);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=message.js.map