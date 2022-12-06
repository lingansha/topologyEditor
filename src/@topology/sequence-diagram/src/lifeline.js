export function lifeline(ctx, pen) {
    var headHeight = pen.headHeight ? pen.headHeight : 50;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ey = _a.ey;
    var wr = pen.calculative.borderRadius || 0, hr = wr;
    if (pen.calculative.borderRadius < 1) {
        wr *= width;
        hr *= height;
    }
    var r = wr < hr ? wr : hr;
    if (width < 2 * r) {
        r = width / 2;
    }
    if (headHeight < 2 * r) {
        r = headHeight / 2;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + headHeight, r);
    ctx.arcTo(x + width, y + headHeight, x, y + headHeight, r);
    ctx.arcTo(x, y + headHeight, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([7, 7]);
    var middle = x + width / 2;
    ctx.moveTo(middle, y + headHeight + 1);
    ctx.lineTo(middle, ey);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    return false;
}
//# sourceMappingURL=lifeline.js.map