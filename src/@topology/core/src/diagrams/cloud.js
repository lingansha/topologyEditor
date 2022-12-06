export function cloud(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x + width / 5, y + (height * 13) / 16);
    path.bezierCurveTo(x - width / 15, y + (height * 13) / 16, x - width / 15, y + (height * 7) / 16, x + width / 5, y + (height * 7) / 16);
    path.bezierCurveTo(x + width / 5, y, x + (width * 4) / 5, y, x + (width * 4) / 5, y + (height * 7) / 16);
    path.bezierCurveTo(x + (width * 16) / 15, y + (height * 7) / 16, x + (width * 16) / 15, y + (height * 13) / 16, x + (width * 4) / 5, y + (height * 13) / 16);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=cloud.js.map