export function leftArrow(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x, y + height / 2);
    path.lineTo(x + height / 2, y);
    path.lineTo(x + height / 2, y + height / 3);
    path.lineTo(x + width, y + height / 3);
    path.lineTo(x + width, y + (height * 2) / 3);
    path.lineTo(x + height / 2, y + (height * 2) / 3);
    path.lineTo(x + height / 2, y + (height * 2) / 3);
    path.lineTo(x + height / 2, y + height);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function rightArrow(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x, y + height / 3);
    path.lineTo(x + (width - height / 2), y + height / 3);
    path.lineTo(x + (width - height / 2), y);
    path.lineTo(x + width, y + height / 2);
    path.lineTo(x + (width - height / 2), y + height);
    path.lineTo(x + (width - height / 2), y + (height * 2) / 3);
    path.lineTo(x, y + (height * 2) / 3);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function twowayArrow(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    path.moveTo(x, y + height / 2);
    path.lineTo(x + height / 2, y);
    path.lineTo(x + height / 2, y + height / 3);
    path.lineTo(x + (width - height / 2), y + height / 3);
    path.lineTo(x + (width - height / 2), y);
    path.lineTo(x + width, y + height / 2);
    path.lineTo(x + (width - height / 2), y + height);
    path.lineTo(x + (width - height / 2), y + (height * 2) / 3);
    path.lineTo(x + height / 2, y + (height * 2) / 3);
    path.lineTo(x + height / 2, y + height);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
//# sourceMappingURL=arrow.js.map