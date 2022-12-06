export function interfaceClass(pen, ctx) {
    if (!pen.onDestroy) {
        pen.onDestroy = onDestroy;
        pen.onAdd = onAdd;
    }
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, ex = _a.ex;
    var wr = pen.calculative.borderRadius || 0, hr = wr;
    if (wr < 1) {
        wr *= width;
        hr *= height;
    }
    var r = wr < hr ? wr : hr;
    if (width < 2 * r) {
        r = width / 2;
    }
    if (height < 2 * r) {
        r = height / 2;
    }
    path.moveTo(x + r, y);
    path.arcTo(x + width, y, x + width, y + height, r);
    path.arcTo(x + width, y + height, x, y + height, r);
    path.arcTo(x, y + height, x, y, r);
    path.arcTo(x, y, x + width, y, r);
    var topHeight = 0.2 * height;
    path.moveTo(x, y + topHeight);
    path.lineTo(ex, y + topHeight);
    var secondHeight = y + topHeight + (height - topHeight) / 2;
    path.moveTo(x, secondHeight);
    path.lineTo(ex, secondHeight);
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
function onAdd(pen) {
    var _a = pen.calculative.worldRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var list = pen.list;
    var childPen = {
        name: 'text',
        x: x,
        y: y + 0.2 * height,
        width: width,
        height: 0.4 * height,
        text: list[0].text,
        textAlign: 'left',
        textBaseline: 'top',
        textLeft: 10,
        textTop: 10,
    };
    var childPen1 = {
        name: 'text',
        x: x,
        y: y + 0.6 * height,
        width: width,
        height: 0.4 * height,
        text: list[1].text,
        textAlign: 'left',
        textBaseline: 'top',
        textLeft: 10,
        textTop: 10,
    };
    pen.calculative.canvas.makePen(childPen);
    pen.calculative.canvas.makePen(childPen1);
    pen.calculative.canvas.parent.pushChildren(pen, [childPen]);
    pen.calculative.canvas.parent.pushChildren(pen, [childPen1]);
}
function onDestroy(pen) {
    var store = pen.calculative.canvas.store;
    pen.children.forEach(function (p) {
        var i = store.data.pens.findIndex(function (item) { return item.id === p; });
        if (i > -1) {
            store.data.pens.splice(i, 1);
            store.pens[p] = undefined;
        }
    });
    pen.children = undefined;
}
//# sourceMappingURL=interfaceClass.js.map