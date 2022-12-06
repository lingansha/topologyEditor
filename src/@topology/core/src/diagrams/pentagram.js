var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function pentagram(pen, ctx) {
    if (!pen.onResize) {
        pen.onResize = resize;
    }
    var path = !ctx ? new Path2D() : ctx;
    var _a = pen.calculative.worldRect, width = _a.width, height = _a.height, center = _a.center;
    var r = width > height ? height : width;
    //旋转中心点
    var centerx = center.x;
    var centery = center.y;
    var basey = centery - r / 2;
    var baseyi = centery - r / 4;
    var lx = -(baseyi - centery) * Math.sin((Math.PI / 180) * 324) + centerx;
    var ly = (baseyi - centery) * Math.cos((Math.PI / 180) * 324) + centery;
    path.moveTo(lx, ly);
    for (var i = 0; i < 5; ++i) {
        // TODO: Math.sin Math.cos 考虑优化下
        path.lineTo(-(basey - centery) * Math.sin((Math.PI / 180) * 72 * i) + centerx, (basey - centery) * Math.cos((Math.PI / 180) * 72 * i) + centery);
        path.lineTo((lx - centerx) * Math.cos((Math.PI / 180) * 72 * (i + 1)) -
            (ly - centery) * Math.sin((Math.PI / 180) * 72 * (i + 1)) +
            centerx, (lx - centerx) * Math.sin((Math.PI / 180) * 72 * (i + 1)) +
            (ly - centery) * Math.cos((Math.PI / 180) * 72 * (i + 1)) +
            centery);
    }
    path.closePath();
    if (path instanceof Path2D)
        return path;
}
export function pentagramAnchors(pen) {
    // TODO: 组合状态下的 width height 成了固定的百分比
    var width = pen.width, height = pen.height;
    var r = width > height ? height : width;
    var anchors = [];
    for (var i = 0; i < 5; ++i) {
        anchors.push({
            flag: 1,
            id: String(i),
            penId: pen.id,
            x: 0.5 + ((r / 2) * Math.sin((Math.PI / 180) * 72 * i)) / width,
            y: ((-r / 2) * Math.cos((Math.PI / 180) * 72 * i)) / height + 0.5,
        });
    }
    pen.anchors = anchors;
}
function resize(pen) {
    var _a;
    // 过滤出非默认锚点，即自定义锚点
    var manualPoints = pen.anchors.filter(function (point) { return point.flag !== 1; });
    pentagramAnchors(pen);
    pen.anchors = (_a = pen.anchors).concat.apply(_a, __spreadArray([], __read(manualPoints), false));
}
//# sourceMappingURL=pentagram.js.map